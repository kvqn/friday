from friday import Aggregator


agg = Aggregator(endpoint="http://localhost:5000")

print(agg.count(namespace="plug-controller"))
