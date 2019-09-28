data = [{
  "test_case": 1,
  "guests": 4,
  "tables": 2,
  "friends": [[2, 4]],
  "enemies": [],
  "families": []
}, {
  "test_case": 2,
  "guests": 4,
  "tables": 2,
  "friends": [[2, 4]],
  "enemies": [[2, 3], [1, 2]],
  "families": []
}]

output = []
for element in data :
    output.append({'test_case': element['test_case'],'satisfiable': False ,'allocation': [[] for i in range(element['tables'])]})
    
