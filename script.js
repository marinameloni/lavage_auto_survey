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

// Ranking system functionality
let draggedElement = null;
let rankingContainer = null;

document.addEventListener('DOMContentLoaded', function() {
  rankingContainer = document.getElementById('ranking-container');
  
  if (rankingContainer) {
    // Initialize drag and drop
    initializeRanking();
    updateRankingResult();
  }
});

function initializeRanking() {
  const rankingItems = rankingContainer.querySelectorAll('.ranking-item');
  
  rankingItems.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
  });
}

function handleDragStart(e) {
  draggedElement = this;
  this.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(rankingContainer, e.clientY);
  const dragging = document.querySelector('.dragging');
  
  if (afterElement == null) {
    rankingContainer.appendChild(dragging);
  } else {
    rankingContainer.insertBefore(dragging, afterElement);
  }
}

function handleDrop(e) {
  e.preventDefault();
  updateRankingNumbers();
  updateRankingResult();
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  draggedElement = null;
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.ranking-item:not(.dragging)')];
  
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateRankingNumbers() {
  const rankingItems = rankingContainer.querySelectorAll('.ranking-item');
  rankingItems.forEach((item, index) => {
    const numberElement = item.querySelector('.ranking-number');
    numberElement.textContent = index + 1;
  });
}

function updateRankingResult() {
  const rankingItems = rankingContainer.querySelectorAll('.ranking-item');
  const result = [];
  
  rankingItems.forEach((item, index) => {
    const value = item.dataset.value;
    const label = item.querySelector('.ranking-label').textContent;
    result.push(`${index + 1}. ${label}`);
  });
  
  document.getElementById('ranking-result').value = result.join(', ');
}
