-- create and use ski_db;
CREATE DATABASE ski_resorts_db;
USE ski_resorts_db;

-- load the skiResort.csv file into the birdsong table:
-- right click Tables under ski_resorts_db, do Table Data Import Wizard
CREATE TABLE `skiresort` (
  `ResortName` text,
  `Continent` text,
  `Country` text,
  `StateProvince` text,
  `URL` text,
  `Altitude` int(11) DEFAULT NULL,
  `Easy` double DEFAULT NULL,
  `Intermediate` double DEFAULT NULL,
  `Difficult` double DEFAULT NULL,
  `Funicular` text,
  `CirculatingRopewayGondola` text,
  `Chairlift` text,
  `T-barPlatterButton` text,
  `SunkidMovingCarpet` text,
  `Adult` int(11) DEFAULT NULL,
  `Youth` int(11) DEFAULT NULL,
  `Child` int(11) DEFAULT NULL,
  `Currency` text,
  `ResortSize` text,
  `SlopeOfferingVariety` text,
  `LiftsAndCableCars` text,
  `SnowReliability` text,
  `SlopePreparation` text,
  `AccessParking` text,
  `Orientation` text,
  `Cleanliness` text,
  `EnvironmentallyFriendly` text,
  `StaffFriendliness` text,
  `Restaurants` text,
  `ApresSki` text,
  `AccomodationsToLifts` text,
  `FamiliesChildren` text,
  `Beginners` text,
  `Advanced` text,
  `SnowParks` text,
  `Cross-countryTrails` text,
  `AerialTramwayReverseRopeway` text,
  `RopeTowBeginnerLift` text,
  `PeopleMover` text,
  `CombinedGondolaChair` text,
  `CogRailway` text,
  `Helicopter` text,
  `SnowCaterpillars` text
-- Check data was uploaded
SELECT * FROM skiresort;

-- create the cleaned North America table
CREATE TABLE `clean_skiresortnortamerica` (
  `ID` bigint(20) NOT NULL,
  `ResortName` text,
  `Continent` text,
  `Country` text,
  `StateProvince` text,
  `URL` text,
  `Altitude` int(11) DEFAULT NULL,
  `Easy` text,
  `Intermediate` text,
  `Difficult` text,
  `Funicular` text,
  `CirculatingRopewayGondola` text,
  `Chairlift` text,
  `T-barPlatterButton` text,
  `SunkidMovingCarpet` text,
  `Adult` int(11) DEFAULT NULL,
  `Youth` int(11) DEFAULT NULL,
  `Child` int(11) DEFAULT NULL,
  `Currency` text,
  `ResortSize` text,
  `SlopeOfferingVariety` text,
  `LiftsAndCableCars` text,
  `SnowReliability` text,
  `SlopePreparation` text,
  `AccessParking` text,
  `Orientation` text,
  `Cleanliness` text,
  `EnvironmentallyFriendly` text,
  `StaffFriendliness` text,
  `Restaurants` text,
  `ApresSki` text,
  `AccomodationsToLifts` text,
  `FamiliesChildren` text,
  `Beginners` text,
  `Advanced` text,
  `SnowParks` text,
  `Cross-countryTrails` text,
  `AerialTramwayReverseRopeway` text,
  `RopeTowBeginnerLift` text,
  `PeopleMover` text,
  `CombinedGondolaChair` text,
  `CogRailway` text,
  `Helicopter` text,
  `SnowCaterpillars` text,
  `Latitude` double DEFAULT NULL,
  `Longitude` double DEFAULT NULL,
  PRIMARY KEY (`ID`)
