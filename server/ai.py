import sys
import pandas as pd
import json
# Testing python child process
# Next goal: parsing incoming state
# After that: implementing AI
print("Output from Python")
print("First name: " + sys.argv[1])

data = json.loads(sys.argv[1])

#load data into a DataFrame object:
df = pd.DataFrame(data)

print(df) 
sys.stdout.flush()