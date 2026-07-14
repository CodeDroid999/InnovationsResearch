## Expected Inputs and Outputs

Based on the notebook and the machine learning pipeline it implements, the models expect **numerical features describing a country's economy, startup ecosystem, and AI workforce**. They then output either a **predicted class** (classification) or a **predicted numeric value** (regression), depending on the model.

## Expected Model Inputs

The model expects one row of data (one observation) with features similar to those used during training.

| Feature Category      | Example Inputs                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------- |
| Country Information   | Country, Region (if encoded)                                                                |
| Economy               | GDP, Agriculture (% GDP), Industry (% GDP), Services (% GDP), Inflation, Population         |
| Government Investment | Education expenditure, Health expenditure                                                   |
| Startup Ecosystem     | Total funding, Number of funding rounds, Average funding, Company age                       |
| AI Adoption           | AI investment, AI policy index, AI adoption rate                                            |
| Workforce             | Employment rate, Automation rate, Productivity index, Average salary, Reskilling investment |

### Example Input

| Feature               |      Value |
| --------------------- | ---------: |
| GDP per Capita        |       4200 |
| Population            | 54,000,000 |
| Inflation             |        5.2 |
| Education Expenditure |        4.8 |
| Health Expenditure    |        6.3 |
| AI Investment         |        320 |
| Automation Rate       |         38 |
| Employment Rate       |         72 |
| Startup Funding       | 18,500,000 |
| Funding Rounds        |          7 |
| Company Age           |          5 |
| Productivity Index    |         81 |

This feature vector is what is passed to the trained model for prediction.

---

# Expected Outputs

## 1. Classification Models

Examples:

- Logistic Regression
- Decision Tree Classifier
- Random Forest Classifier

### Output

A predicted category.

Example:

```text
Startup Success = Successful
```

or

```text
Startup Success = Unsuccessful
```

The model may also return prediction probabilities.

Example:

| Class        | Probability |
| ------------ | ----------: |
| Successful   |        0.91 |
| Unsuccessful |        0.09 |

---

## 2. Regression Models

Examples:

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor
- Gradient Boosting Regressor

### Output

A continuous numerical value.

Examples:

```text
Predicted Enterprise Success Score = 84.6
```

or

```text
Predicted AI Adoption Index = 73.4
```

or

```text
Predicted GDP Growth = 4.1%
```

The exact meaning depends on the target variable used during training.

---

## 3. Feature Importance

Tree-based models can also output feature importance values.

Example:

| Feature               | Importance |
| --------------------- | ---------: |
| AI Investment         |       0.28 |
| Startup Funding       |       0.24 |
| Productivity Index    |       0.18 |
| Education Expenditure |       0.12 |
| Employment Rate       |       0.08 |
| Others                |       0.10 |

This helps explain which inputs have the greatest influence on the prediction.

---

## 4. Model Evaluation Outputs

During testing, the notebook reports metrics rather than predictions.

### Classification

- Accuracy
- Precision
- Recall
- F1-score
- Confusion Matrix

### Regression

- Mean Absolute Error (MAE)
- Mean Squared Error (MSE)
- Root Mean Squared Error (RMSE)
- R² Score

These metrics measure how well the model performs on unseen data.

---

## Input–Output Workflow

```text
User Input Features
        │
        ▼
Data Preprocessing
(Cleaning, Scaling)
        │
        ▼
Trained Machine Learning Model
        │
        ▼
Prediction
        │
        ├── Classification → Predicted class + probabilities
        │
        ├── Regression → Predicted numeric value
        │
        └── Feature Importance → Most influential variables
```

### Example Prediction

**Input**

```text
Country: Kenya
GDP per Capita: 4200
AI Investment: 320
Startup Funding: $18.5M
Employment Rate: 72%
Automation Rate: 38%
Education Expenditure: 4.8%
```

**Output**

```text
Predicted Startup Success: Successful
Confidence: 91%

Most Important Factors:
1. AI Investment
2. Startup Funding
3. Productivity Index
4. Education Expenditure
```

**Note:** To identify the **exact input columns and the exact target/output** for your trained `.joblib` model (rather than the expected ones based on the notebook structure), I'd need to inspect the training notebook or the saved preprocessing pipeline. That would reveal the precise feature names, their order, and the target variable used during training.
