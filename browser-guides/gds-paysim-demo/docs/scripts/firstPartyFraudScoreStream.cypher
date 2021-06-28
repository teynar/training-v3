MATCH(c:Client) 
WHERE c.firstPartyFraudScore IS NOT NULL
WITH percentileCont(c.firstPartyFraudScore,$firstPartyFraudThreshold) 
    AS firstPartyFraudThreshold
MATCH(c:Client)
WHERE c.firstPartyFraudScore>firstPartyFraudThreshold
RETURN c.name,c.firstPartyFraudScore
ORDER BY c.firstPartyFraudScore DESC;
