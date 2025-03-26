import torch
from transformers import BertTokenizer, BertForSequenceClassification

# Load pre-trained BERT model
bert_model = BertForSequenceClassification.from_pretrained("bert-base-uncased")
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

def analyze_logs(logs):
    """ Use BERT to detect suspicious logs """
    inputs = tokenizer(logs, return_tensors="pt", truncation=True, padding=True)
    outputs = bert_model(**inputs)
    anomaly_score = torch.softmax(outputs.logits, dim=1)[0][1].item()
    return anomaly_score > 0.7  # Return True if anomaly detected

def analyze_metrics(cpu, mem, net_in, net_out):
    """ Simple threshold for anomaly detection (Replace with LSTM later) """
    if cpu > 80 or mem > 1e9:  # CPU > 80% or Mem > 1GB
        return True
    return False
