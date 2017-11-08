const port='4000';
const localhost='http://localhost:'+port;
export default{
	"addCategory":localhost+'/category/addcategory',
	"getCategory":localhost+'/category/getcategory',
	"deleteCategory":localhost+'/category/deletecategory/',
	"updateCategory":localhost+'/category/updatecategory/',
	"transaction":localhost+'/transaction',
	"deleteUser":localhost+'/deleteuser',
	"plaidAccessToken":localhost+'/plaidaccounts/accesstoken',
	"plaidAccount":localhost+'/plaidaccounts/accounts',
	"plaidItem":localhost+'/plaidaccounts/item',
	"accounts":localhost+'/account/addaccount',
	"reset":localhost+'/reset',
	"forget":localhost+'/forgotPass/',
	"login":localhost+'/login',
	"upload":localhost+'/upload/'
	
}