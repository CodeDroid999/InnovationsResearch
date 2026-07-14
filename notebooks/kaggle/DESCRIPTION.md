From the notebook, the project builds predictive machine learning models using **combined datasets** (World Bank, Startup Funding, and Global Workforce data) to analyze the **impact of AI on African startups**. The notebook trains, tunes, evaluates, and saves multiple models.

## Computations Performed

### 1. Data Integration

- Combines multiple datasets into one dataset.
- Removes missing values.
- Selects predictor (feature) variables and the target variable.

### 2. Feature Engineering

The model uses features from three domains:

**Economic indicators**

- Agriculture (% GDP)
- Industry (% GDP)
- Service (% GDP)
- Education expenditure
- Health expenditure
- Population
- Inflation rate

**Startup ecosystem**

- Total funding
- Funding rounds
- Average funding per round
- Funding diversity
- Company age
- US-based indicator
- Log of total funding

**AI and workforce**

- AI investment
- Automation rate
- Employment rate
- Average salary
- Productivity index
- Reskilling investment
- AI policy index

### 3. Data Preprocessing

- Cleans missing values.
- Splits the dataset into **80% training** and **20% testing**.
- Standardizes (scales) numerical features using `StandardScaler`.

### 4. Model Training

The notebook trains different machine learning algorithms depending on the prediction task.

**Classification models**

- Logistic Regression
- Decision Tree Classifier
- Random Forest Classifier

**Regression models**

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor
- Gradient Boosting Regressor

### 5. Feature Importance

For tree-based models, the notebook computes **feature importance** scores to identify which variables contribute most to predictions.

### 6. Hyperparameter Tuning

The notebook improves model performance using **GridSearchCV**.

Examples of tuned parameters include:

- Maximum tree depth
- Minimum samples per split
- Minimum samples per leaf
- Number of trees
- Learning rate (Gradient Boosting)

### 7. Cross-Validation

Performs **5-fold cross-validation** to estimate how well each model generalizes to unseen data.

### 8. Model Evaluation

The notebook computes several evaluation metrics.

For regression:

- Mean Squared Error (MSE)
- Root Mean Squared Error (RMSE)
- Mean Absolute Error (MAE)
- R² Score

For classification (libraries are imported for these metrics):

- Accuracy
- Precision
- Recall
- F1-score
- Confusion Matrix
- Classification Report

### 9. Model Saving

The trained models are saved as `.joblib` files for later use.

---

# What the Models Can Do

The notebook's models can:

- Predict startup success (when using a classification target such as `target_success`).
- Predict continuous outcomes (when using a regression target such as AI readiness or GDP per capita).
- Estimate the probability that a startup will succeed (classification models).
- Rank the most influential factors affecting startup performance through feature importance.
- Compare multiple algorithms to identify the best-performing model.
- Make predictions on new startup or economic data after training.
- Evaluate model performance on unseen test data.
- Support decision-making by identifying key drivers such as AI investment, funding, productivity, education spending, or AI policy.

---

## Machine Learning Pipeline

```text
Raw Datasets
      │
      ▼
Combine Datasets
      │
      ▼
Clean Missing Values
      │
      ▼
Select Features & Target
      │
      ▼
Train/Test Split (80/20)
      │
      ▼
Feature Scaling
      │
      ▼
Train Models
(Logistic Regression,
Decision Tree,
Random Forest,
Linear Regression,
Gradient Boosting)
      │
      ▼
Hyperparameter Tuning
      │
      ▼
Cross Validation
      │
      ▼
Model Evaluation
      │
      ▼
Feature Importance
      │
      ▼
Save Trained Models (.joblib)
```

## Expected Outputs

The notebook produces:

- Trained machine learning models.
- Performance metrics (Accuracy, R², RMSE, MAE, etc.).
- Feature importance rankings.
- A CSV file containing model evaluation results (`model_evaluation_results.csv`).
- Saved `.joblib` model files for deployment or future prediction.

Overall, this notebook implements a complete machine learning workflow—from data preparation and preprocessing through model training, optimization, evaluation, interpretation, and persistence—for analyzing and predicting outcomes related to the impact of AI on African startups.

#Code Analysis

The notebook contains **68 cells** (markdown and code). It follows a complete machine learning pipeline. Below is a cell-by-cell explanation.

---

# Cells 0–6: Project Documentation

## Cell 0 – Cover Image

- Displays the notebook cover image.
- No computation is performed.

---

## Cell 1 – Introduction

Explains:

- The motivation for studying AI in African startups.
- The business problem.
- The expected outcomes.

**Purpose:** Provides project background.

---

## Cell 2 – Project Title

Introduces the project:

> _Impact of AI in African Startups and Enterprise Success in 2025_

Describes:

- Research objectives.
- AI adoption.
- Enterprise success.

---

## Cell 3 – Methodology

Explains the workflow:

1. Collect data
2. Clean data
3. Explore data
4. Engineer features
5. Train models
6. Evaluate models
7. Save models

---

## Cell 4 – Setup

Describes the notebook configuration and execution environment.

---

## Cell 5 – Import Libraries

Introduces the libraries used.

---

## Cell 6 – Library Description

Explains why each library is needed.

Examples include:

- pandas
- NumPy
- matplotlib
- scikit-learn
- joblib

---

# Cell 7 – Import Libraries (Code)

This is the first computation cell.

It imports libraries such as:

- pandas
- numpy
- matplotlib
- seaborn
- sklearn
- joblib

**Purpose**

Provides functions for:

- reading datasets
- preprocessing
- visualization
- machine learning
- saving models

---

# Cells 8–14: Loading Data

## Cell 8

Explains dataset loading.

---

## Cell 9

Introduces the World Bank dataset.

---

## Cell 10

Loads

```python
Countries.csv
```

Computations:

- Read CSV
- Create dataframe

Output:

```
wb_df
```

---

## Cell 11

Introduces Startup Funding dataset.

---

## Cell 12

Loads

```
investments_VC.csv
```

Output

```
sf_df
```

Contains startup investment information.

---

### Cell 13

Introduces Global AI Workforce dataset.

---

### Cell 14

Loads

```
global_ai_workforce_automation_2015_2025.csv
```

Output

```
gw_df
```

---

# Cells 15–18: Dataset Sampling

These cells perform

- dataframe shape
- info()
- head()
- statistics

Purpose

Understand the structure before preprocessing.

---

# Cells 19–33: Data Preprocessing

---

## Cell 20

Introduces quality assessment.

---

## Cells 22,24,26

Perform quality checks.

Computations include

- Missing values

```python
isnull().sum()
```

- Duplicate rows

```python
duplicated()
```

- Data types

```python
dtypes
```

- Dataset dimensions

```python
shape
```

Purpose

Determine data quality.

---

## Cells 29,31,33

Cleaning operations.

Typical computations

- Remove missing values

```python
dropna()
```

- Remove duplicates

```python
drop_duplicates()
```

- Reset index

```python
reset_index()
```

Output

Three clean datasets.

---

# Cells 34–40: Exploratory Data Analysis

---

## Cell 36

EDA for World Bank data.

Computations

- Mean
- Median
- Standard deviation
- Correlation
- Histograms

Purpose

Understand economic indicators.

---

## Cell 38

EDA for Startup Funding.

Analyzes

- Funding distribution
- Startup status
- Categories
- Investment trends

---

## Cell 40

EDA for AI Workforce.

Analyzes

- AI adoption
- Employment
- Automation
- Salaries
- Skills

Purpose

Identify trends before modeling.

---

# Cells 41–47: Feature Engineering

These cells create new variables.

---

## Cell 43

World Bank Features

Examples

- GDP ratios
- Economic indicators
- Composite variables

Purpose

Improve predictive performance.

---

## Cell 45

Startup Features

Creates variables such as

- Total funding
- Funding rounds
- Startup age
- Funding diversity

Purpose

Represent startup performance more accurately.

---

## Cell 47

AI Workforce Features

Creates

- AI readiness
- Productivity measures
- Skill indicators
- Automation scores

Purpose

Capture workforce characteristics.

---

# Cells 48–56: Statistics and Visualization

These cells create graphs.

Examples include

- Histograms
- Scatter plots
- Correlation heatmaps
- Bar charts
- Boxplots

Purpose

Visualize relationships among variables.

---

# Cells 57–60: Model Training

---

## Cell 59

This is the main machine learning cell.

Major computations

### Train-Test Split

```python
train_test_split()
```

Splits

80%

↓

Training

20%

↓

Testing

---

### Feature Scaling

```python
StandardScaler()
```

Standardizes variables.

---

### Model Training

The notebook trains models including

- Logistic Regression
- Decision Tree
- Random Forest
- Linear Regression
- Gradient Boosting

Each model learns patterns from the training data.

---

### Model Evaluation

Computes metrics such as

Regression

- RMSE
- MAE
- R²

Classification

- Accuracy
- Precision
- Recall
- F1-score

---

### Feature Importance

Tree models compute

```python
feature_importances_
```

to rank the most influential predictors.

---

# Cell 60

Saves trained models.

Uses

```python
joblib.dump()
```

Produces

```
decision_tree.joblib
random_forest.joblib
gradient_boosting.joblib
```

Purpose

Reuse models without retraining.

---

# Cells 61–65: Testing and Validation

---

## Cell 63

Hyperparameter tuning.

Uses

```python
GridSearchCV
```

Searches for optimal values of parameters like:

- max_depth
- n_estimators
- min_samples_split
- learning_rate

Purpose

Improve predictive accuracy.

---

## Cell 64

Model Validation.

Tests the optimized models on unseen data.

Computes final performance metrics.

---

## Cell 65

Produces validation results.

Compares all trained models.

Identifies the best-performing model.

---

# Cells 66–67: Results

---

## Cell 66

Summarizes findings.

Discusses

- Model performance
- AI impact
- Important predictors
- Business implications

---

## Cell 67

Conclusion.

Summarizes the entire project.

May also save final outputs and evaluation tables.

---

# Overall Machine Learning Workflow

```text
Collect Data
      ↓
Load CSV Files
      ↓
Data Cleaning
      ↓
Data Quality Assessment
      ↓
Exploratory Data Analysis
      ↓
Feature Engineering
      ↓
Train/Test Split
      ↓
Feature Scaling
      ↓
Train Machine Learning Models
      ↓
Hyperparameter Tuning
      ↓
Model Testing
      ↓
Model Validation
      ↓
Compare Models
      ↓
Save Best Models (.joblib)
      ↓
Generate Results and Conclusions
```

This notebook is a **complete end-to-end machine learning project**. It progresses from raw datasets to cleaned data, exploratory analysis, engineered features, multiple trained models, hyperparameter optimization, evaluation, and finally saves the trained models for future prediction.
