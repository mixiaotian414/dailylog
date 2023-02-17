# dailylog
ORACLE 创建相关

sqlplus / as sysdba

select file_name,tablespace_name from dba_data_files;

/home/oracle/app/oracle/oradata/ORCL/gljy.dbf

create tablespace GLJY_JX_DL datafile '/home/oracle/app/oracle/oradata/ORCL/gljy_jx_dl.dbf' size 100M autoextend on next 50m maxsize 2048m ;
create tablespace GLJY_JX_DL datafile '/oracle/oradata/GLJYJX/gljy_jx_dl.dbf' size 100M autoextend on next 50m maxsize 2048m ;

CREATE USER gljy_jx_dl IDENTIFIED BY gljy_jx_dl DEFAULT TABLESPACE GLJY_JX_DL;
grant connect,resource to gljy_jx_dl;

grant unlimited tablespace to gljy_jx_dl;

grant create database link to gljy_jx_dl;

grant select any sequence,create materialized view to gljy_jx_dl;

grant unlimited tablespace to gljy_jx_dl;

grant select any table to gljy_jx_dl;

create or replace directory gljy_jx_dl as '/oracle/oradata/GLJYJX'; 
grant read, write on directory gljy_jx_dl  to gljy_jx_dl;

/home/oracle/data/gljy_jx20230216.dmp

impdp gljy_jx_dl/gljy_jx_dl directory=GLJY_JX_DL dumpfile=gljy_jx20230216.dmp full=y;

expdb gljy_jx_dl/gljy_jx_dl directory=GLJY_JX_DL dumpfile=12c_gljy_jx20230216.dmp full=y version=12.2.0.1.0
