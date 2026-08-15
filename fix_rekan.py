import json

correct = {
    "kha": "ꦏ꦳",
    "dza": "ꦢ꦳"
}

with open("src/src/data/rekan_contours.json", "r") as f:
    data = json.load(f)

for item in data:
    if item["id"] in correct:
        item["unicode"] = correct[item["id"]]

with open("src/src/data/rekan_contours.json", "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Fixed rekan_contours.json")
