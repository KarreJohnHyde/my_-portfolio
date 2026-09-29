# Cognitive Learning: Machine Learning & Behavioral Profiling (Innoverse'26)

## System Overview
Cognitive Learning is an unsupervised machine learning platform developed by Karre John Hyde for the Innoverse'26 Hackathon. It evaluates student telemetry across 8+ behavioral dimensions (dwell time per concept, assessment mistake recovery speed, hint query frequency, revision cadence) to automatically classify learners into 5 distinct cognitive archetypes.

## Machine Learning Pipeline
1. Feature Extraction & Normalization: MinMax scaling and Standard Scaling across sparse interaction logs.
2. Dimensionality Reduction: Principal Component Analysis (PCA) reducing 8 continuous behavioral variables down to 3 orthogonal cognitive axes retaining >89% explained variance.
3. Clustering: K-Means with Silhouette Analysis and Elbow Criterion identifying optimal cluster count k=5 (Deep Analytical, Intuitive Rapid, Methodical Sequential, Visual Concrete, Remedial Exploratory).
4. Adaptive Dynamic Curriculum: Cluster outputs dynamically adjust quiz generation difficulty and explanation style.

## Production Implementation
- Framework: Python, scikit-learn, NumPy, Pandas, Streamlit Cloud.
- Inference Performance: PCA projection + K-Means cluster assignment takes <4ms per student session, enabling real-time dashboard updates.
