MATCH(c:Client) 
WHERE c.firstPartyFraudScore IS NOT NULL
WITH percentileCont(c.firstPartyFraudScore,$firstPartyFraudThreshold) 
    AS firstPartyFraudThreshold
MATCH(c:Client)
WHERE c.firstPartyFraudScore>firstPartyFraudThreshold
SET c:FirstPartyFraudster;
