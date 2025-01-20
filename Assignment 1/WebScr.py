#pip install requests
#pip install beautifulsoup4
 
import time
from bs4 import BeautifulSoup 
import os

import wget
id = 'xn6BVdoAAAAJ'
url = 'https://scholar.google.ca/citations?user='+id+'&hl=en&pagesize=100'

# Specify the file
fname = id+'.html'

# Check if the file exists
if os.path.exists(fname):
   print("The file exists.")
else:
   wget.download(url,fname)

f = open(fname, "r")
r = f.read()

soup = BeautifulSoup(r, 'html.parser')
print(soup.prettify())

# you can select class and print its content
content = soup.find_all(class_='gsc_a_t')
print(content)
fcsv = open(id + '.csv', "w")
fcsv.write('PaperId,Year,CiteCount\n')
counter = 0
for a in soup.find_all('a', href=True):
    childlink = 'https://scholar.google.ca' + a['href']
    if(('/citations?' in childlink) and ('citation_for_view=' in childlink)):
        counter = counter + 1
        print("Paper:"+str(counter), childlink)
        if os.path.exists(str(counter)+'.html'):
            print("The file exists.")
        else:
            wget.download(childlink, str(counter)+'.html')
            print('running ...')
            time.sleep(10)

        f = open(str(counter)+'.html', "r")
        r = f.read()
        soup = BeautifulSoup(r, 'html.parser')

        print("Printing the list of years where the paper got citation and the number of citations in those years")

        years=[]
        for a in soup.find_all('a', href=True):
            yearinfo =  a['href']
            if (('as_ylo=' in  yearinfo) and ('as_yhi=' in  yearinfo)):
                years.append(yearinfo[-4:])
                print(yearinfo[-4:])

        citations = soup.findAll('span', class_='gsc_oci_g_al')
        for c in citations:
            print(c.text)


        #WRITE YOUR CODE HERE
        
fcsv.close()
print('done')

