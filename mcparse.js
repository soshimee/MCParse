function mcParse(object) {
	const colors = {
		dark_red: "#a00",
		red: "#f55",
		gold: "#fa0",
		yellow: "#ff5",
		dark_green: "#0a0",
		green: "#5f5",
		aqua: "#5ff",
		dark_aqua: "#0aa",
		dark_blue: "#00a",
		blue: "#55f",
		light_purple: "#f5f",
		dark_purple: "#a0a",
		white: "#fff",
		gray: "#aaa",
		dark_gray: "#555",
		black: "#000",
		reset: ""
	};

	const element = document.createElement("template");

	function normalize(object) {
		if (Array.isArray(object)) object = {"text": object[0], extra: object.slice(1)};
		else if (typeof object !== "object") object = {"text": object.toString()};

		if ("extra" in object) object.extra = object.extra.map(extra => normalize(extra));

		return object;
	}

	object = normalize(object);

	function append(object, element) {
		const span = document.createElement("span");

		span.innerText = object.text;
		if (object.color) span.style.color = colors[object.color];
		if (object.bold) span.style.fontWeight += " bold";
		if (object.italic) span.style.fontStyle += " italic";
		if (object.underlined) span.style.textDecorationLine += " underline";
		if (object.strikethrough) span.style.textDecorationLine += " line-through"
		if (object.extra) object.extra.forEach(extra => append(extra, span));

		element.appendChild(span);
	}

	append(object, element.content);

	return element.innerHTML;
}