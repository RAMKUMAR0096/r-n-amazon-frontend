const backendDomain = 'http://10.0.2.2:8000'  //http://localhost:8000 || http://10.0.2.2:8000

const SummaryApi = {
    register : {
        url : `${backendDomain}/api/register`
    },
    login : {
        url : `${backendDomain}/api/login`,
        method : 'post'
    },
    addAddress : {
        url : `${backendDomain}/api/add-address`,
        method : 'post'
    }
}
    
export default SummaryApi