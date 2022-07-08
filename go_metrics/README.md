# Как запускать

* `go run main.go`
* `./go_metrics`

# После запуска

По адресу `http://localhost:8080` будут доступны следующие урлы:

* `/metrics` - отдача мерик для прометея
* `/counter` - инкрементит метрику `counter` с лейблом `counter`
* `/gauge-increment` - инкриментит метрику `gauge`, а так же инкрементит метрику `counter` с лейблом `gauge-increment`
* `/gauge-decrement` - декриментит метрику `gauge`, а так же инкрементит метрику `counter` с лейблом `gauge-decrement`
* `/histogram` - добавляет к метрике `histogram` рандомное число от 1 до 10, а так же 
инкрементит метрику `counter` с лейблом `histogram`
