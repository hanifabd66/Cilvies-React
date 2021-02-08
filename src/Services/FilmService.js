import httpClient from '../Common/http';

class FilmService {
    retrieveAll() {
        return httpClient.get("/films/")
    }
    searchByTitle(title){
        return httpClient.get(`/films?title=${title}`);
    }
    retrieveById(id) {
        return httpClient.get(`/films/${id}`)
    }
    create(data) {
        return httpClient.post("/films/", data)
    }
    update(id, data) {
        return httpClient.put(`/films/${id}`, data)
    }
    delete(id) {
        return httpClient.delete(`/films/${id}`)
    }
}

export default new FilmService();