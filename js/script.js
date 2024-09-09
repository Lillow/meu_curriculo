let file_name = "resume";

document.addEventListener("DOMContentLoaded", function () {
	fetch(`../data/${file_name}.json`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					"Erro ao carregar o arquivo JSON: " + response.statusText
				);
			}
			return response.json();
		})
		.then((data) => {
			// Preencher a foto
			const photoSection = document.querySelector(".photo-section img");
			photoSection.src = data.photo || "../images/default.jpg";
			photoSection.alt = `Foto de ${data.name}`;

			// Preencher dados do currículo
			document.getElementById("name").textContent =
				data.name || "Nome não disponível";
			document.getElementById("title").textContent =
				data.title || "Título não disponível";
			document.getElementById("description").textContent =
				data.description || "Descrição não disponível";

			// Preencher habilidades
			let skillsList = document.getElementById("skills-list");
			for (let category in data.skills) {
				let listItem = document.createElement("li");
				listItem.innerHTML = `<strong>${capitalizeFirstLetter(
					category.replace(/([A-Z])/g, " $1")
				)}:</strong> ${data.skills[category].join(", ")}`;
				skillsList.appendChild(listItem);
			}

			// Preencher experiência
			let experienceList = document.getElementById("experience-list");
			data.experience.forEach((exp) => {
				let listItem = document.createElement("li");
				listItem.innerHTML = `<strong>${exp.role}</strong> - ${
					exp.company
				} | ${exp.dates}<ul>${exp.tasks
					.map((task) => `<li>${task}</li>`)
					.join("")}</ul>`;
				experienceList.appendChild(listItem);
			});

			// Preencher educação
			let educationList = document.getElementById("education-list");
			data.education.forEach((edu) => {
				let listItem = document.createElement("li");
				listItem.innerHTML = `<strong>${edu.institution}</strong> - ${
					edu.course
				} | ${edu.dates}<ul>${edu.details
					.map((detail) => `<li>${detail}</li>`)
					.join("")}</ul>`;
				educationList.appendChild(listItem);
			});

			// Preencher contatos
			let contactList = document.getElementById("contact-list");
			for (let contactType in data.contact) {
				let listItem = document.createElement("li");
				if (contactType === "Email") {
					listItem.innerHTML = `<strong>${capitalizeFirstLetter(
						contactType
					)}:</strong> <a href="mailto:${
						data.contact[contactType]
					}">${data.contact[contactType]}</a>`;
				} else if (contactType === "Telefone" || contactType === "Endereço") {
					listItem.innerHTML = `<strong>${capitalizeFirstLetter(
						contactType
					)}:</strong> ${data.contact[contactType]}`;
				} else {
					listItem.innerHTML = `<strong>${capitalizeFirstLetter(
						contactType
					)}:</strong> <a href="${
						data.contact[contactType]
					}" target="_blank">${data.contact[contactType]}</a>`;
				}
				contactList.appendChild(listItem);
			}

			// Preencher idiomas
			let languagesList = document.getElementById("languages-list");
			for (let language in data.languages) {
				let listItem = document.createElement("li");
				listItem.innerHTML = `<strong>${language}:</strong> ${data.languages[language]}`;
				languagesList.appendChild(listItem);
			}
		})
		.catch((error) => console.error("Erro ao carregar o JSON:", error));

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
});
