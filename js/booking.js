// Init v0
document.addEventListener("DOMContentLoaded", function () {
	// Réinitialisation des champs numériques
	document.getElementById("adults").value = 0;
	document.getElementById("children").value = 0;
	document.getElementById("rooms").value = 0;

	// Masquage initial de la colonne d'âge des enfants
	const childrenAgeCell = document.getElementById("childrenAgeCell");
	if (childrenAgeCell) {
		childrenAgeCell.style.display = "none";
	}
});

// icrémenter v0
function incrementValue(fieldId) {
	const input = document.getElementById(fieldId);
	const currentValue = parseInt(input.value);
	input.value = currentValue + 1;

	// maj age children
	if (fieldId === "children") {
		updateChildrenAgeFields();
	}
}

// décrémenter v0
function decrementValue(fieldId) {
	const input = document.getElementById(fieldId);
	const currentValue = parseInt(input.value);

	// valeur supérieure à 0 avant de décrémenter
	if (currentValue > 0) {
		input.value = currentValue - 1;

		// maj age children
		if (fieldId === "children") {
			updateChildrenAgeFields();
		}
	}
}

// maj champs childrenAge
function updateChildrenAgeFields() {
	const childrenCount = parseInt(document.getElementById("children").value);
	const childrenAgeCell = document.getElementById("childrenAgeCell");
	const childrenAgeContainer = document.getElementById(
		"childrenAgeContainer"
	);

	if (!childrenAgeCell || !childrenAgeContainer) {
		console.error("Éléments pour les âges des enfants non trouvés");
		return;
	}

	childrenAgeContainer.innerHTML = "";

	if (childrenCount > 0) {
		// cellule d'âge
		childrenAgeCell.style.display = "";

		// champs d'âge pour chaque enfant
		for (let i = 0; i < childrenCount; i++) {
			const ageInput = document.createElement("input");
			ageInput.type = "number";
			ageInput.className = "form-control mb-2";
			ageInput.id = `childAge${i}`;
			ageInput.min = 0;
			ageInput.max = 17;
			ageInput.placeholder = `Âge de l'enfant ${i + 1}`;
			ageInput.required = true;

			ageInput.addEventListener("input", function () {
				validateChildAge(this);
			});

			childrenAgeContainer.appendChild(ageInput);
		}
	} else {
		// Masquer la cellule d'âge si aucun enfant
		childrenAgeCell.style.display = "none";
	}
}

// valider l'âge
function validateChildAge(input) {
	// Convertir en nombre et supprimer les zéros initiaux
	let age = parseInt(input.value);

	// Vérifier si la valeur est valide
	if (isNaN(age) || age < 0) {
		age = 0;
	} else if (age > 17) {
		age = 17;
	}

	// Mettre à jour la valeur sans zéro initial
	input.value = age;
}

// valider dates
function validateDates() {
	const departureDate = document.getElementById("departureDate").value;
	const arrivalDate = document.getElementById("arrivalDate").value;

	if (!departureDate || !arrivalDate) {
		alert("Veuillez sélectionner les dates de départ et d'arrivée");
		return false;
	}

	const departure = new Date(departureDate);
	const arrival = new Date(arrivalDate);

	if (departure >= arrival) {
		alert("La date de départ doit être antérieure à la date d'arrivée");
		return false;
	}
	return true;
}

// Ajouter le gestionnaire d'événement pour la soumission du formulaire
document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("bookingForm");
	if (form) {
		form.addEventListener("submit", validateForm);
	}
});

// valider le formulaire
function validateForm(event) {
	event.preventDefault(); // stop soumission par défaut

	const country = document.getElementById("country").value;
	const departureDate = document.getElementById("departureDate").value;
	const arrivalDate = document.getElementById("arrivalDate").value;
	const adults = parseInt(document.getElementById("adults").value);
	const children = parseInt(document.getElementById("children").value);
	const rooms = parseInt(document.getElementById("rooms").value);
	const businessTrip = document.getElementById("businessTrip").checked;

	// Vérifier si les champs obligatoires sont remplis
	if (!country) {
		alert("Veuillez sélectionner un pays");
		return false;
	}

	if (!departureDate || !arrivalDate) {
		alert("Veuillez sélectionner les dates de départ et d'arrivée");
		return false;
	}

	// Vérifier si au moins un adulte est sélectionné
	if (adults === 0) {
		alert("Veuillez sélectionner au moins un adulte");
		return false;
	}

	// Vérifier si au moins une chambre est sélectionnée
	if (rooms === 0) {
		alert("Veuillez sélectionner au moins une chambre");
		return false;
	}

	// Vérifier les dates
	if (!validateDates()) {
		return false;
	}

	// vérifier les âges des enfants si présents
	const childrenAges = [];
	if (children > 0) {
		for (let i = 0; i < children; i++) {
			const ageInput = document.getElementById(`childAge${i}`);
			if (!ageInput || !ageInput.value) {
				alert("Veuillez indiquer l'âge de tous les enfants");
				return false;
			}
			const age = parseInt(ageInput.value);
			if (isNaN(age) || age < 0 || age > 17) {
				alert("L'âge des enfants doit être compris entre 0 et 17 ans");
				return false;
			}
			childrenAges.push(age);
		}
	}

	// Sauvegarder les données dans le localStorage
	const bookingData = {
		country,
		departureDate,
		arrivalDate,
		adults,
		children,
		rooms,
		businessTrip,
		childrenAges
	};
	localStorage.setItem("bookingData", JSON.stringify(bookingData));

	window.location.href = "hotels.html";
	return true;
}
