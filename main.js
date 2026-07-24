const heroFormPoint = document.querySelector(".hero-form__point");
const metricRadio = document.getElementById("metric");
const imperialRadio = document.getElementById("imperial");

const resultValue = document.querySelector(".result-point span");

const handleCalculateMetricBmi = () => {
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);
  if (!weight || !height) {
    return;
  }

  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);
  renderResult(bmi, heightInMeter, "metric");
};

const handleCalculateImperialBmi = () => {
  const heightFtInput = document.getElementById("height-ft");
  const heightInInput = document.getElementById("height-in");
  const weightStInput = document.getElementById("weight-st");
  const weightLbsInput = document.getElementById("weight-lbs");

  const heightFt = Number(heightFtInput.value);
  const heightIn = Number(heightInInput.value);
  const weightSt = Number(weightStInput.value);
  const weightLbs = Number(weightLbsInput.value);

  if (!heightFt || !heightIn || !weightSt || !weightLbs) {
    return;
  }

  const totalInches = heightFt * 12 + heightIn;
  const heightInMeter = totalInches * 0.0254;

  const totalPounds = weightSt * 14 + weightLbs;
  const weightInKg = totalPounds * 0.45359237;

  const bmi = weightInKg / (heightInMeter * heightInMeter);
  renderResult(bmi, heightInMeter, "imperial");
};

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "a healthy weight";
  if (bmi < 30) return "overweight";
  return "obese";
};

const renderMetric = () => {
  heroFormPoint.innerHTML = metricTemmplate;

  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  heightInput.addEventListener("input", handleCalculateMetricBmi);
  weightInput.addEventListener("input", handleCalculateMetricBmi);
};

const renderImperial = () => {
  heroFormPoint.innerHTML = imperialTemplate;
  const heightFtInput = document.getElementById("height-ft");
  const heightInInput = document.getElementById("height-in");
  const weightStInput = document.getElementById("weight-st");
  const weightLbsInput = document.getElementById("weight-lbs");

  heightFtInput.addEventListener("input", handleCalculateImperialBmi);
  heightInInput.addEventListener("input", handleCalculateImperialBmi);
  weightStInput.addEventListener("input", handleCalculateImperialBmi);
  weightLbsInput.addEventListener("input", handleCalculateImperialBmi);
};

const calculateIdealWeight = (heightInMeter, weightInKg) => {
  const minWeight = 18.5 * (heightInMeter ** 2);
  const maxWeight = 24.9 * (heightInMeter ** 2);

  return {
    minWeight,
    maxWeight,
  };
};

const calculateIdealStonePounds = (weightInKg) => {
  const totalPounds = weightInKg / 0.45359237;
  const stone = Math.floor(totalPounds / 14);
  const pounds = Math.round(totalPounds % 14);

  if (pounds === 14) {
    stone += 1;
    pounds = 0;
  }
  return {
    stone,
    pounds,
  };
};

const handleConvertFromKgToPound = (minWeight, maxWeight) => {
  const minIdeal = calculateIdealStonePounds(minWeight);
  const maxIdeal = calculateIdealStonePounds(maxWeight);
  return {
    minIdeal,
    maxIdeal,
  };
};

const renderResult = (bmi, heightInMeter, type) => {
  const resultDescription = document.querySelector(".result-description");

  resultValue.textContent = bmi.toFixed(1);

  const category = getBmiCategory(bmi);

  const { minWeight, maxWeight } = calculateIdealWeight(heightInMeter);
  const { minIdeal, maxIdeal } = handleConvertFromKgToPound(
    minWeight,
    maxWeight,
  );

  if (type === "metric") {
    resultDescription.innerHTML = `Your BMI suggests you're <span>${category}</span>. Your ideal weight is
              between <strong>${minWeight.toFixed(1)}kgs - ${maxWeight.toFixed(1)}kgs</strong>.`;
  }
  if (type === "imperial") {
    resultDescription.innerHTML = `Your BMI suggests you're <span>${category}</span>. Your ideal weight is
              between <strong>${minIdeal.stone}st ${minIdeal.pounds}lbs - ${maxIdeal.stone}st ${maxIdeal.pounds}lbs</strong>.`;
  }
};
const metricTemmplate = `
              <div class="hero-form__input">
                <label for="height">Height</label>
                <label class="input-card" for="height">
                  <input type="text" inputmode="decimal" id="height" placeholder="0"/>
                  <span>cm</span>
                </label>
              </div>

              <div class="hero-form__input">
                <label for="weight">Weight</label>
                <label class="input-card" for="weight">
                  <input type="text" inputmode="decimal" id="weight" placeholder="0"/>
                  <span>kg</span>
                </label>
              </div>
`;

const imperialTemplate = `
              <div class="hero-form__input">
                <label for="height">Height</label>
                <div class="hero-form-input__height">
                <label class="input-card input-card__ft" for="height-ft">
                  <input type="text" inputmode="decimal" id="height-ft" placeholder="0"/>
                  <span>ft</span>
                </label>

                <label class="input-card input-card__in" for="height-in">
                  <input type="text" inputmode="decimal" id="height-in" placeholder="0"/>
                  <span>in</span>
                </label>
                </div>
              </div>

              <div class="hero-form__input">
                <label for="weight">Weight</label>
                <div class="hero-form-input__weight">
                <label class="input-card" for="weight-st">
                  <input type="text" inputmode="decimal" id="weight-st" placeholder="0"/>
                  <span>st</span>
                </label>

                <label class="input-card" for="weight-lbs">
                  <input type="text" inputmode="decimal" id="weight-lbs" placeholder="0"/>
                  <span>lbs</span>
                </label>
                </div>
              </div>
`;

metricRadio.addEventListener("change", renderMetric);

imperialRadio.addEventListener("change", renderImperial);

heroFormPoint.innerHTML = metricTemmplate;

renderMetric();
