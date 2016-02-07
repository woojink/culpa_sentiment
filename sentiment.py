import requests

base_url_sentiment = "http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment"
base_url_keyword = "http://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords"
params = {	"apikey": "",
			"outputMode": "json" }

def get_sentiment(params, review):
	"""
	Args:
	    params (dict): parameters for the Alchemy API
	    review (str): text of the API
	"""
	params['text'] = review
	resp_sentiment = requests.get(base_url_sentiment, params=params)

	if resp_sentiment.status_code == requests.codes.ok:
		sentiment = resp_sentiment.json()['docSentiment']['type']
		score = resp_sentiment.json()['docSentiment']['score']
		return sentiment, score
	else:
		return None, None

def get_keywords(params, review):
	"""
    Args:
        params (dict): parameters for the Alchemy API
        review (str): text of the API
    """
	params['text'] = review
	resp_keywords = requests.get(base_url_keyword, params=params)

	if resp_keywords.status_code == requests.codes.ok:
		keywords = []
		for keyword in resp_keywords.json()['keywords']:
			keywords.append(keyword['text'])
		return keywords
	else:
		return None