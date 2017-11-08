const port='4000';
const localhost='http://localhost:'+port;
//const localhost='http://192.168.252.186:'+port;

export default{
	
	"register":localhost+'/registerUser',
	"mailotpSend":localhost+'/otpVerify/sendOTP',
	"mailotpVerify":localhost+'/otpVerify/verifyOTP',
	"getUserInfo":localhost+'/getUserInfo/',
	"getUserInfoPhoto":localhost+'/getUserInfo/photo/',
	"uploadFileGeneral":localhost+'/fileTransfer/uploadFileGeneral/',
	"uploadFileOneOne":localhost+'/fileTransfer/uploadFileOneOne/'
	
	
}
