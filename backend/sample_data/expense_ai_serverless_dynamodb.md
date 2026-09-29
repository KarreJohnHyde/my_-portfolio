# Expense AI: Serverless Architecture & Financial Intelligence

## System Overview
Expense AI is a cloud-native financial intelligence application engineered by Karre John Hyde. It processes physical receipts via automated OCR, parses merchant and tax metadata, handles QR payments, and logs immutable double-entry transactions in Amazon DynamoDB.

## Engineering Stack
- Frontend: Next.js 14, TypeScript, Tailwind CSS, Vercel Edge Runtime.
- Cloud Backend: AWS Lambda (Node.js/Python), Amazon API Gateway, Amazon DynamoDB, S3 for receipt asset retention.
- Machine Learning / Vision: Tesseract / AWS Textract pipelines for tabular line-item extraction with confidence scoring.

## Architectural Trade-offs: DynamoDB vs Relational SQL
- Write Concurrency: In a microservices or event-driven billing architecture, high burst transactions (e.g. end-of-month reconciliation) require non-blocking horizontal scalability. DynamoDB single-digit millisecond latency at arbitrary write concurrency was selected over Aurora Serverless to avoid connection pool exhaustion.
- Partition Key Design: `PK: USER#<userId>`, `SK: TX#<timestamp>#<txId>` enables sub-10ms queries for time-sliced spending histories without costly table scans.
- GSI (Global Secondary Index): Structured by `Category-Timestamp` to power immediate Pareto-distribution aggregation of user expenses.

## Benchmarks & Latency
- OCR extraction p90 latency: 1.4 seconds.
- Transaction persist p99 latency: 18ms.
- End-to-end receipt-to-ledger execution: under 2.1 seconds.
