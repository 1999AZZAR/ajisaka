import json

correct_unicodes = {
    "ha": "\\uA9B2",
    "na": "\\uA9A4",
    "ca": "\\uA995",
    "ra": "\\uA9AB",
    "ka": "\\uA98F",
    "da": "\\uA9A2",
    "ta": "\\uA9A0",
    "sa": "\\uA9B1",
    "wa": "\\uA9AE",
    "la": "\\uA9AD",
    "pa": "\\uA9A5",
    "dha": "\\uA99D",
    "ja": "\\uA997",
    "ya": "\\uA9AA",
    "nya": "\\uA99A",
    "ma": "\\uA9A9",
    "ga": "\\uA992",
    "ba": "\\uA9A7",
    "tha": "\\uA99B",
    "nga": "\\uA994"
}

with open("src/src/data/nglegena_contours.json", "r") as f:
    data = json.load(f)

for item in data:
    if item["id"] in correct_unicodes:
        item["unicode"] = correct_unicodes[item["id"]]

with open("src/src/data/nglegena_contours.json", "w") as f:
    json.dump(data, f, indent=2)

print("Fixed nglegena_contours.json")
