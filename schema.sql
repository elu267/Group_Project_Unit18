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
  `Intermed` double DEFAULT NULL,
  `Difficult` double DEFAULT NULL,
  `ropewayGondolaLift` text,
  `Chairlift` text,
  `T-barPlatterButton` text,
  `SunkidMovingCarpet` text,
  `Adult` int(11) DEFAULT NULL,
  `Youth` int(11) DEFAULT NULL,
  `Child` int(11) DEFAULT NULL,
  `Currency` text,
  `ResortSize` text,
  `SlopeOffering` text,
  `LiftsCableCars` text,
  `SnowReliability` text,
  `SlopePrep` text,
  `Access` text,
  `Orientation` text,
  `Cleanliness` text,
  `EnvironFriendly` text,
  `StaffFriendliness` text,
  `MountainEats` text,
  `Accomodations` text,
  `FamiliesChildren` text,
  `Beginners` text,
  `Advanced` text,
  `SnowParks` text,
  `CCTrails` text,
  `AerialTramway` text,
  `RopeToeBeginnerLift` text,
  `PeopleMover` text,
  `CombinedInstallation` text,
  `CogRailway` text,
  `HelicopterHeli-skiing` text,
  `SnowCaterpillars` text
-- Check data was uploaded
SELECT * FROM skiresort;


