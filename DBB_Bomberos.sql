use master
go

create database DB_CuerpoDeBomberos
go

use DB_CuerpoDeBomberos
go


create table Pension(
idPension int IDENTITY(1,1) primary key,
nombrePension varchar(50) not null,
)
go

create table PlazaNominal(
idPlaza int IDENTITY(1,1) primary key,
nombrePlaza varchar(50) not null,
)
go

create table Ubicacion(
idUbicacion int IDENTITY(1,1) primary key,
nombreUbicacion varchar(50) not null,
)
go

create table TipoEmpleado(
idTipo int IDENTITY(1,1) primary key,
nombreTipo varchar(50) not null,
)
go

create table Usuarios(
idUsuario int IDENTITY(1,1),
NombreUsuario Varchar(50) not null,
tipoUsuario varchar(50) not null,
contra varchar(30) not null,
Ubicacion varchar(50) not null
PRIMARY KEY (idUsuario)
)
go



create table Empleado (
idEmpleado int IDENTITY(1,1) primary key,
nombres varchar(60) not null,
apellidos varchar(60) not null,
salarioNormal money not null,
idTipoEmpleado int foreign key references TipoEmpleado(idTipo)
on delete cascade
on update cascade,
idPension int foreign key references Pension(idPension)
on delete cascade
on update cascade,
idUbicacion int foreign key references Ubicacion(idUbicacion)
on delete cascade
on update cascade,
idPlaza int foreign key references PlazaNominal(idPlaza)
on delete cascade
on update cascade
)
go

create table Reportes (
idReporte int IDENTITY(1,1) primary key,
fechaCreado datetime not null,
idUsuario int foreign key references Usuarios(idUsuario)
on delete cascade
on update cascade,
Verificacion bit not null,
idEmpleado int foreign key references Empleado(idEmpleado)
on delete cascade
on update cascade
)
go

create table ReportesEmpleados(
idEmpleadoReporte int IDENTITY(1,1) primary key,
idEmpleado int foreign key references Empleado(idEmpleado),
idReporte int foreign key references Reportes(idReporte),
minutosDiurnosNormales int not null,
minutosNocturnosNormales int not null,
minutosDiurnosAutorizados int not null,
minutosNocturnosAutorizados int not null,
minutosAutorizados bit not null,
minutosDiurnosTotales int not null,
minutosNocturnosTotales int not null
)
go


insert into Usuarios values('usuario','Admin','123')
insert into Usuarios values('usuario2','Admin','123')
insert into Usuarios values('usuario3','Admin','123')
go

select * from Usuarios





