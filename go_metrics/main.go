package main

import (
	"fmt"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"math/rand"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
)

var (
	counterMetric = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "Counter",
			Help: "Use counter metric",
		},
		[]string{"method"},
	)
	gaugeMetric = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Name: "Gauge",
			Help: "Use gauge metric",
		})
	historgamMetric = prometheus.NewHistogram(
		prometheus.HistogramOpts{
			Namespace: "go_metrics",
			Subsystem: "Example",
			Name:      "Random10",
			Help:      "Use historgram metric",
		})
)

func registerMetrics() {
	prometheus.MustRegister(counterMetric)
	prometheus.MustRegister(gaugeMetric)
	prometheus.MustRegister(historgamMetric)
}

func registerHandlers() {
	http.Handle("/metrics", promhttp.Handler())
	http.HandleFunc("/counter", counterHandler)
	http.HandleFunc("/gauge-increment", gaugeIncrementHandler)
	http.HandleFunc("/gauge-decrement", gaugeDecrementHandler)
	http.HandleFunc("/histogram", histogramHandler)
}

func main() {
	registerMetrics()
	go func() {
		registerHandlers()
		err := http.ListenAndServe(":8080", nil)
		if err != nil {
			fmt.Println(err)
		}
	}()
	New(syscall.SIGTERM, syscall.SIGKILL).Wait()
}

func counterHandler(w http.ResponseWriter, _ *http.Request) {
	incrementCounter("counter")
	_, err := w.Write([]byte("Counter was incremented"))
	if err != nil {
		fmt.Println(err)
	}
}

func gaugeIncrementHandler(w http.ResponseWriter, _ *http.Request) {
	incrementCounter("gauge-increment")
	gaugeMetric.Inc()
	_, err := w.Write([]byte("Gauge was incremented"))
	if err != nil {
		fmt.Println(err)
	}
}

func gaugeDecrementHandler(w http.ResponseWriter, _ *http.Request) {
	incrementCounter("gauge-decrement")
	gaugeMetric.Dec()
	_, err := w.Write([]byte("Gauge was decremented"))
	if err != nil {
		fmt.Println(err)
	}
}

func histogramHandler(w http.ResponseWriter, _ *http.Request) {
	incrementCounter("histogram")
	randNumber := rand.Intn(10)
	historgamMetric.Observe(float64(randNumber))
	_, err := w.Write([]byte("Observe value is " + strconv.Itoa(randNumber)))
	if err != nil {
		fmt.Println(err)
	}
}

func incrementCounter(method string) {
	counterMetric.With(prometheus.Labels{"method": method}).Inc()
}

type Closer struct {
	sigc chan os.Signal
}

func New(sig ...os.Signal) *Closer {
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, sig...)
	return &Closer{
		sigc: sigc,
	}
}

func (c *Closer) Wait() {
	<-c.sigc
	signal.Stop(c.sigc)
}
