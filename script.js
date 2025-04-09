document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const age = parseInt(document.getElementById("age").value);
  const coverage = parseInt(document.getElementById("coverage").value);
  const type = document.getElementById("type").value;

  let baseRate = 0.02; // 2%
  if (type === "health") baseRate = 0.015;
  else if (type === "car") baseRate = 0.03;

  let ageFactor = age > 50 ? 1.5 : 1.2;

  const quote = (coverage * baseRate * ageFactor).toFixed(2);
  document.getElementById("result").textContent = `Estimated Monthly Premium: $${quote}`;
});