#include <iostream>
#include <fstream>
#include <vector>
#include <iterator>
#include <string>
#include <algorithm>
#include <boost/algorithm/string.hpp>

/*
 * A class to read data from a csv file.
 */
using namespace std;
/*
	******************
		IMPORTANT
	******************
	We are sorting according to extension here as we dont know date of joining
	We assume that extension acts like dates and lower extension means a faculty must have joined earlier
*/
std::string::size_type sz;
bool sortcol( const vector<string>& v1, 
               const vector<string>& v2 ) { 
               
 return stoi(v1[4],&sz) < stoi(v2[4],&sz); 
}
class CSVWriter
{
	string fileName;
	string delimeter;
	int linesCount;
 
public:
	CSVWriter(string filename, string delm = ",") :
			fileName(filename), delimeter(delm), linesCount(0)
	{}
	/*
	 * Member function to store a range as comma seperated value
	 */
	template<typename T>
	void addDatainRow(T first, T last);
};
 
/*
 * This Function accepts a range and appends all the elements in the range
 * to the last row, seperated by delimeter (Default is comma)
 */
template<typename T>
void CSVWriter::addDatainRow(T first, T last)
{
	fstream file;
	// Open the file in truncate mode if first line else in Append Mode
	file.open(fileName, ios::out | (linesCount ? ios::app : ios::trunc));
 
	// Iterate over the range and add each lement to file seperated by delimeter.
	for (; first != last; )
	{
		file << *first;
		if (++first != last)
			file << delimeter;
	}
	file << "\n";
	linesCount++;
 
	// Close the file
	file.close();
}
class CSVReader
{
	string fileName;
	string delimeter;

public:
	CSVReader(string filename, string delm = ",") :
			fileName(filename), delimeter(delm)
	{ }

	// Function to fetch data from a CSV File
	vector<vector<string> > getData();
};

/*
* Parses through csv file line by line and returns the data
* in vector of vector of strings.
*/
vector<vector<string> > CSVReader::getData()
{
	ifstream file(fileName);

	vector<vector<string> > dataList;

	string line = "";
	// Iterate through each line and split the content using delimeter
	while (getline(file, line))
	{
		vector<string> vec;
		boost::algorithm::split(vec, line, boost::is_any_of(delimeter));
		dataList.push_back(vec);
	}
	// Close the File
	file.close();

	return dataList;
}
int searchVect(vector<vector<string> > vec,string str,int col){
	for(int i=0;i<vec.size();i++){
		if(vec[i][col]==str)
			return i;
	}
}
bool checkPrevYears(vector<vector<string> > vec,string choice,int pos){
	if((choice==vec[pos][1] || choice==vec[pos][2]) && (choice==vec[pos][3] || choice==vec[pos][4]) && (choice==vec[pos][5] || choice==vec[pos][6]))
		return true;
	return false;
}
bool checkHours(int pos,vector<vector<string> > &subj,vector<vector<string> > &teachList,int prof){
	int totalTime=(stoi(teachList[prof][5]) + stoi(subj[pos][4])+ stoi(subj[pos][6]) * 2);
	if(teachList[prof][2]=="Assistant Professor" && totalTime> 12)
		return false;
	else if(teachList[prof][2]=="Associate Professor" && totalTime> 10)
		return false;
	else if((teachList[prof][2]=="Professor" || teachList[prof][2]=="HoD")  && totalTime> 8)
		return false;
	return true;
}
int allocatingSubj(string choice,vector<vector<string> > &subj,vector<vector<string> > &teachList,int prof){
	int pos=searchVect(subj,choice,2);
	if(!checkHours(pos,subj,teachList,prof))
		return -1;
	if(subj[pos][1]==subj[pos][7])
		return -1;
	else{
		if(subj[pos][6]=="1"){
			int pos2=searchVect(subj,subj[pos][3]+" lab",3);
			if(teachList[prof][9]!="NA"){
				teachList[prof][10]=subj[pos2][3];
				subj[pos2][7]=to_string(stoi(subj[pos2][7])+1);
			}
			else{
				teachList[prof][9]=subj[pos2][3];
				subj[pos2][7]=to_string(stoi(subj[pos2][7])+1);
			}
			teachList[prof][5]=to_string(stoi(teachList[prof][5])+2);
		}
		if(teachList[prof][6]!="NA"){
			if(teachList[prof][7]!="NA"){
				teachList[prof][8]=subj[pos][3];
				subj[pos][7]=to_string(stoi(subj[pos][7])+1);
			}
			else{
				teachList[prof][7]=subj[pos][3];
				subj[pos][7]=to_string(stoi(subj[pos][7])+1);
			}
		}
		else{
			teachList[prof][6]=subj[pos][3];
			subj[pos][7]=to_string(stoi(subj[pos][7])+1);
		}
		
		teachList[prof][5]=to_string(stoi(subj[pos][4]) + stoi(teachList[prof][5]));
	}
	return 1;
}
int main()
{
	// Creating an object of CSVWriter
	CSVReader reader("cse.csv");
	
	// Get the data from CSV File
	vector<vector<string> > teach = reader.getData();


	CSVReader reader2("csessubj.csv");
	vector<vector<string> > subjectList = reader2.getData();
	
	CSVReader reader3("choicesList.csv");
	vector<vector<string> > choices = reader3.getData();
		
	
	vector<vector<string> > Prof,assocProf,asstProf,unallocated;
	
	for(int i=1;i<teach.size();i++){
		if(teach[i][2]=="Assistant Professor")
			asstProf.push_back(teach[i]);
		else if(teach[i][2]=="Associate Professor")
			assocProf.push_back(teach[i]);
		else if(teach[i][2]=="Professor")
			Prof.push_back(teach[i]);
		else{
			int pos=searchVect(choices,teach[i][0],0);
			int j=7,ctr=0;
			int val=allocatingSubj(choices[pos][j],subjectList,teach,i);
			j++;
			while(j<11 && val>0){
				val=allocatingSubj(choices[pos][j],subjectList,teach,i);
				j++;
			}
		}
	}
	sort(asstProf.begin(), asstProf.end(),sortcol); 
	sort(assocProf.begin(), assocProf.end(),sortcol); 
	sort(Prof.begin(), Prof.end(),sortcol); 
	
	CSVWriter writer("teachfinal.csv");
	writer.addDatainRow(teach[0].begin(), teach[0].end());
	int posHoD=searchVect(teach,"HoD",2);
	writer.addDatainRow(teach[posHoD].begin(), teach[posHoD].end());
	
	for(int i=0;i<Prof.size();i++){
		int pos=searchVect(choices,Prof[i][0],0);
		int j=7,ctr=0;
		int val;
		for(;j<11;j++){
			val=allocatingSubj(choices[pos][j],subjectList,Prof,i);
			if(val>0)
				ctr++;
		}
		if(ctr==0)
			unallocated.push_back(Prof[i]);
		else
			writer.addDatainRow(Prof[i].begin(),Prof[i].end());
	}
	
	for(int i=0;i<assocProf.size();i++){
		int pos=searchVect(choices,assocProf[i][0],0);
		int j=7,ctr=0;
		int val;
		for(;j<11;j++){
			val=allocatingSubj(choices[pos][j],subjectList,assocProf,i);
			if(val>0)
				ctr++;
		}
		if(ctr==0)
			unallocated.push_back(assocProf[i]);
		else
			writer.addDatainRow(assocProf[i].begin(),assocProf[i].end());			
	}
	
	for(int i=0;i<asstProf.size();i++){
		int pos=searchVect(choices,asstProf[i][0],0);
		int j=7,ctr=0;
		int val;
		for(;j<11;j++){
			val=allocatingSubj(choices[pos][j],subjectList,asstProf,i);
			if(val>0)
				ctr++;
		}
		if(ctr==0)
			unallocated.push_back(asstProf[i]);
		else
			writer.addDatainRow(asstProf[i].begin(),asstProf[i].end());			
	}
	
	
	for(int i=unallocated.size()-1;i>=0;i--){
		for(int j=0;j<subjectList.size();j++){
			if(subjectList[j][1]!=subjectList[j][7]){
				int pos=searchVect(choices,unallocated[i][0],0);
				int k=7;
				int val,ctr=0;
				for(;k<11;k++)
					val=allocatingSubj(choices[pos][k],subjectList,unallocated,i);
			}
		}
		writer.addDatainRow(unallocated[i].begin(),unallocated[i].end());	
	}

	
	CSVWriter writer2("subjectsfinal.csv");
	for(int i=0;i<subjectList.size();i++){
		writer2.addDatainRow(subjectList[i].begin(), subjectList[i].end());
	}
	return 0;
}
