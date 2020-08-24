import json

uf_target = "CE"

UBSs = json.load(open("./ubs.json","r"))

def uf(feature):
    return feature['properties'][-4]['uf']

features = UBSs['features']
newFeatures = []

for i in range(len(features)):
    if uf(features[i]) == uf_target:
        newFeatures.append(features[i])

UBSs['features'] = newFeatures

print(json.dumps(UBSs))

