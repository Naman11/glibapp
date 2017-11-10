const port='4000';
const localhost='http://localhost:'+port;
export default{

    "saveMessage":localhost+'/generalChats',
		"saveCode":localhost+'/generalChats',
		"getCodeDatas":localhost+'/generalChats',      
		"getCodeDatasById":localhost+'/generalChats/Id/',
		"retrieveMessage":localhost+'/generalChats'
}