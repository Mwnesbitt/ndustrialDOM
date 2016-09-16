import sys
import re
import csv

"""
This code is meant to provide a simple CSV output.  Dominion Virginia Power calculates charges for certain tariffs on a daily basis, 
with days having a rating of A, B or C.  The rating of the day impacts the charges, and is also related to the weather.  Thus, an 
analyst at ndustrial is trying to get a sense of how well we can anticipate/predict which days will be A, B or C days based on 
weather forecasts.  Dominion Virginia Power posted historic records of which days were A, B, and C in html files that I saved.

This code parses the HTML files in order to give an easy to work with CSV output on which days were A, B, and C so that the ndustrial
analyst can more easily do his modeling. 
"""

def extractData(filename):
  #writes a CSV with 2 columns.  Col1 is dates, col2 is A, B, or C.  
  #CSV is saved in the same directory as filename with name = filename_output.csv
  f = open(filename,'r')
  data = f.read()
  #find and print January to a file
  tuples= re.findall(r'<td>\s*<div class="day-number">\s*(\d+)\s*.*\s*<div class="rating" style="background-color:#\w\w\w\w\w\w">\s*(\w)\s*',data)
  if not tuples:
    print("couldn't find the regex anywhere in the file")
    sys.exit(1)
  #print(tuples)
  with open(filename+'_output.csv', 'w',encoding='utf8',newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)    
    header=[filename]
    writer.writerow(header)
    header=['Day of Month', 'ABorC']
    writer.writerow(header)
    for item in tuples:
        writer.writerow(item)
    csvfile.close() 
  return #not sure I need this

def main():  
  if len(sys.argv) ==2: #If a single command line argument is passed, assume its the file name and read that
    extractData(sys.argv[1]) #read the filename in sys.argv[1]
  elif(len(sys.argv) > 2):  #If extra command line arguments are passed, no can do.
    print("You can only specify one file at this time") #This could be changed in the future
  elif len(sys.argv) ==1: #Not implemented 
    print ("Not implemented yet-- you need to run this on the files one at a time, sorry.") #run the program for all the files in the directory
  else:
    print("Can this even happen?")

if __name__ == '__main__':
  main()