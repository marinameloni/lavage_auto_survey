let currentStep = 0;
const steps = document.querySelectorAll(".form-step");

function showStep(n) {
  steps.forEach((step, i) => step.classList.toggle("active", i === n));
  document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline";
  document.getElementById("nextBtn").style.display = n === steps.length - 1 ? "none" : "inline";
  document.getElementById("submitBtn").style.display = n === steps.length - 1 ? "inline" : "none";
}

function nextPrev(n) {
  if (n === 1 && !validateForm()) return false;
  currentStep += n;
  showStep(currentStep);
}

function validateForm() {
  const inputs = steps[currentStep].querySelectorAll("input, select, textarea");
  for (const input of inputs) {
    if (input.hasAttribute("required") && !input.value) {
      input.style.borderColor = "red";
      return false;
    }
  }
  return true;
}

showStep(currentStep);

// Criteria selection functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize criteria selection
  initializeCriteriaSelection();
});

function initializeCriteriaSelection() {
  const criteriaSelects = document.querySelectorAll('.criteria-select');
  
  criteriaSelects.forEach(select => {
    select.addEventListener('change', updateCriteriaResult);
  });
  
  // Initial update
  updateCriteriaResult();
}

function updateCriteriaResult() {
  const criteriaData = {
    'Prix': document.querySelector('select[name="critere_prix"]')?.value || '',
    'Rapidité': document.querySelector('select[name="critere_rapidite"]')?.value || '',
    'Propreté': document.querySelector('select[name="critere_proprete"]')?.value || '',
    'Accessibilité': document.querySelector('select[name="critere_accessibilite"]')?.value || '',
    'Produits écologiques': document.querySelector('select[name="critere_produits_eco"]')?.value || ''
  };
  
  // Create a readable summary
  const result = Object.entries(criteriaData)
    .filter(([key, value]) => value !== '')
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
  
  const rankingResult = document.getElementById('ranking-result');
  if (rankingResult) {
    rankingResult.value = result;
  }
}
