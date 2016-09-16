# ndustrialDOM
ndustrial project to parse Dominion Virginia Power HTML files for historical data

This code is meant to provide a simple CSV output.  Dominion Virginia Power calculates charges for certain tariffs on a daily basis, 
with days having a rating of A, B or C.  The rating of the day impacts the charges, and we hypothesize that it is driven primarily by
the weather.  Thus, an analyst at ndustrial is trying to get a sense of how well we can anticipate/predict which days will be A, B or 
C days based on weather forecasts.  Dominion Virginia Power posted historic records of which days were A, B, and C in html files that I saved.

This code parses the HTML files in order to give an easy to work with CSV output on which days were A, B, and C so that the ndustrial
analyst can more easily do his modeling. 