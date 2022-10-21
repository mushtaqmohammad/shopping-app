import axios from 'axios';
const baseUrl = 'http://localhost:8081/api/v1.0/shopping';
//const loginId=localStorage.getItem('loginId');
class ProductService {

	getAllProduct() {
		return axios.get(baseUrl + '/all');
	}
	getProductSearch(productName) {
		return axios.get(baseUrl + '/products/search/' + productName);
	}
	addProduct(product, productName) {
		return axios.post(baseUrl + '/' + productName + '/add', product);
	}
	updateProduct(product, productName, productId) {
		return axios.put(baseUrl + '/' + productName + '/update/' + productId, product);
	}
	deleteProduct(product, productName, productId) {
		return axios.delete(baseUrl + '/' + productName + '/delete/' + productId, product);
	}
}
export default new ProductService()