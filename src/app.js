function createApp(app) {
	return {
		render(selector) {
			const $root = document.querySelector(selector)
			$root.insertAdjacentElement('beforeend', app)
			return this
		},
		use(...callbacks) {
			callbacks.forEach(fn => fn())
			return this
		}
	}
}

export default createApp
