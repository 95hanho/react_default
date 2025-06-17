import instance from "./AxiosInterceptor";

export const get_normal = async (url, json, headers) => {
	url = url.replace(/ /gi, "%20");
	let queryString = "";
	if (json && Object.entries(json).length > 0) {
		queryString += "?";
		for (let key in json) {
			if (queryString.indexOf("?") !== queryString.length - 1) {
				queryString += "&";
			}
			queryString += `${key}=${json[key]}`;
		}
	}
	return await instance
		.get(url + queryString, {
			headers,
		})
		.then(({ data }) => data);
};

// download
export const get_download = async (url, json, headers) => {
	url = url.replace(/ /gi, "%20");
	let queryString = "";
	if (json && Object.entries(json).length > 0) {
		queryString += "?";
		for (let key in json) {
			if (queryString.indexOf("?") !== queryString.length - 1) {
				queryString += "&";
			}
			queryString += `${key}=${json[key]}`;
		}
	}
	return await instance.get(url + queryString, {
		headers,
		responseType: "blob",
	});
};

// post body
export const post_json = async (url, params, headers) => {
	return await instance
		.post(url, params, {
			headers,
		})
		.then(({ data }) => data);
};

// post formData
export const post_formData = async (url, params, headers) => {
	const formData = new FormData();
	Object.entries(params).map((v) => {
		if (v[1] instanceof Array || v[1] instanceof FileList) {
			for (let value of v[1]) {
				formData.append(v[0], value);
			}
		} else {
			formData.append(v[0], v[1]);
		}
	});
	return await instance
		.post(url, formData, {
			headers,
		})
		.then(({ data }) => data);
};

// post urlFormData
export const post_urlFormData = async (url, params, headers) => {
	const url_form_data = new URLSearchParams();
	Object.entries(params).map((v) => {
		if (v[1] instanceof Array) {
			for (let value of v[1]) {
				url_form_data.append(v[0], value);
			}
		} else {
			url_form_data.append(v[0], v[1]);
		}
	});
	return await instance
		.post(url, url_form_data, {
			headers,
		})
		.then(({ data }) => data);
};

// put urlFormData
export const put_urlFormData = async (url, params, headers) => {
	const url_form_data = new URLSearchParams(params);
	return await instance
		.put(url, url_form_data, {
			headers,
		})
		.then(({ data }) => data);
};

// delete
export const delete_normal = async (url, json) => {
	url = url.replace(/ /gi, "%20");
	let queryString = "";
	if (json && Object.entries(json).length > 0) {
		queryString += "?";
		for (let key in json) {
			if (queryString.indexOf("?") !== queryString.length - 1) {
				queryString += "&";
			}
			queryString += `${key}=${json[key]}`;
		}
	}
	return await instance.delete(url + queryString).then(({ data }) => data);
};
