import sys
# import pandas as pd
import json

# Testing python child process
# Next goal: parsing incoming state
# After that: implementing AI
# print("Output from Python")
# print("First name: " + sys.argv[1])

messages = json.loads(sys.argv[1])
keywords = list(sys.argv[2].split(','))
users = list(sys.argv[3].split(','))

# load data into a DataFrame object:
# df = pd.DataFrame(data)
# tf = df.pivot(index=['admin', 'user'], columns='text')
for user in users:
  entries = 0
  for message in messages:
    for word in keywords:
      if word in message["text"] and message["username"] == user:
        entries += 1
  print(user + ': ' + str(entries))


sys.stdout.flush()