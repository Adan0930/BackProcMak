CREATE DATABASE IF NOT EXISTS ProcMak;

USE ProcMak;

CREATE TABLE Companys(
    CompanyID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    NameCompany VARCHAR(255) NOT NULL,
    EmailCompany VARCHAR(255) NOT NULL UNIQUE,
    CreateDate TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UsersCompany(
    UserID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    NameUser VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    CompanyID INT,
    RolePermissionsID INT,
    Photo BLOB,
    CreateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    --  CONSTRAINT fk_companyID 
--         FOREIGN KEY(CompanyID) REFERENCES Companys(CompanyID)
--         ON DELETE CASCADE 
--         ON UPDATE CASCADE,
--     CONSTRAINT fk_RoPerID 
--         FOREIGN KEY(RolePermissionsID) REFERENC  ES RolePermissions(RolePermissionsID)
--         ON DELETE CASCADE 
--         ON UPDATE CASCADE 
);

CREATE TABLE Clients(
    ClientID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CompanyID INT,
    Name VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    RFC CHAR(13) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone INT(10) NOT NULL,
    Address VARCHAR(255),
    CreateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- CONSTRAINT fk_ComID 
    --     FOREIGN KEY(CompanyID) REFERENCES Companys(CompanyID)
);

CREATE TABLE Suscriptions(
    SuscriptionID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(20) NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    DurationDays INT NOT NULL,
    StartDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CompanySuscriptions(
    ComSusID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CompanyID INT NOT NULL,
    SuscriptionID INT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Status ENUM ('SUCCEEDED', 'PENDING','FAILED') DEFAULT NULL,
    CreateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- CONSTRAINT fk_ComSus_ComID FOREIGN KEY (CompanyID) 
    --     REFERENCES Companys(CompanyID)
    -- CONSTRAINT fk_SusID FOREIGN KEY (SuscriptionID)
    --     REFERENCES Suscriptions(SuscriptionID)
);

CREATE TABLE Payments(
    PaymentID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CompanyID INT NOT NULL,
    ComSusID INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    Status ENUM('SUCCEEDED','PENDING','FAILED') DEFAULT NULL,
    TransantionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- CONSTRAINT fk_Pay_ComID 
    --     FOREIGN KEY (CompanyID) REFERENCES Companys(CompanyID)
    -- CONSTRAINT fk_ComSusID 
    --     FOREIGN KEY ComSusID REFERENCES CompanySuscriptions(ComSusID)
);



CREATE TABLE Roles(
    RoleID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    RoleName VARCHAR(50) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    RoleDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Permissions(
    PermissionsID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    PermissionsName VARCHAR(255) NOT NULL,
    Route VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    PermissionsDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RolePermissions(
    RolePermissionsID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    RoleID INT,
    PermissionsID INT,
    RolPerDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- CONSTRAINT fk_RoleID 
    --     FOREIGN KEY RoleID REFERENCES Roles(RoleID)
    --     ON DELETE CASCADE
    --     ON UPDATE CASCADE 
    -- CONSTRAINT fk_PermissionsID
    --     FOREIGN KEY PermissionsID REFERENCES Permissions(PermissionsID)
    --     ON DELETE CASCADE 
    --     ON UPDATE CASCADE 
);

CREATE TABLE Orders(
    OrderID VARCHAR(10) NOT NULL PRIMARY KEY UNIQUE,
    NameWorkOrder VARCHAR(255) NOT NULL UNIQUE,
    Priority VARCHAR(255),
    StartDate DATE,
    CompletionDate DATE,
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LoadCapacity VARCHAR(255),
    TypeMetal VARCHAR(255),
    Harness VARCHAR(255),
    Lights VARCHAR(255),
    Stake VARCHAR(255)
);

-- ALTERS TABLES 
ALTER TABLE UsersCompany 
    ADD CONSTRAINT fk_companyID FOREIGN KEY (CompanyID)
    REFERENCES Companys(CompanyID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE UsersCompany
    ADD CONSTRAINT fk_RolePerID FOREIGN KEY (RolePermissionsID)
    REFERENCES RolePermissions(RolePermissionsID)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE Clients
    ADD CONSTRAINT fk_ComID FOREIGN KEY (CompanyID)
    REFERENCES Companys(CompanyID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE Payments 
    ADD CONSTRAINT fk_Pay_ComID FOREIGN KEY (CompanyID) 
    REFERENCES Companys(CompanyID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE Payments
    ADD CONSTRAINT fk_ComSusID FOREIGN KEY (ComSusID)
    REFERENCES CompanySuscriptions(ComSusID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE CompanySuscriptions
    ADD CONSTRAINT fk_ComSus_ComID FOREIGN KEY (CompanyID) 
    REFERENCES Companys(CompanyID)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE CompanySuscriptions 
    ADD CONSTRAINT fk_SusID FOREIGN KEY (SuscriptionID) 
    REFERENCES Suscriptions(SuscriptionID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE RolePermissions 
    ADD CONSTRAINT fk_RoleID FOREIGN (KEYRoleID)
    REFERENCES Roles(RoleID)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE RolePermissions
    ADD CONSTRAINT fk_PermissionsID FOREIGN KEY  (PermissionsID)
    REFERENCES Permissions(PermissionsID)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;



SELECT NameUser, Password, EmailCompany FROM UsersCompany INNER JOIN 
Companys ON UsersCompany.CompanyID = Companys.CompanyID
WHERE NameUser = ? AND Password = ? AND EmailCompany = ? ;



SELECT COUNT(*) FROM UsersCompany INNER JOIN 
Companys ON UsersCompany.CompanyID = Companys.CompanyID;