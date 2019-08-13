#!/bin/sh
key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibmFjaG8iLCJpYXQiOjE1NjU3MTQ2MjksImV4cCI6MTU2NTcxODIyOX0.AHB50y6V7WrT02X3nQD4XeBdtLLwcWHpIQB392MJVOs"
####Definimos lor parametros de conexion a la BBDD mysql
SQL_HOST=localhost
SQL_USER="root"
SQL_PASSWORD="rootroot"
SQL_DATABASE="my_fit_world"
####Montamos los parametros de conexión.
SQL_ARGS="-h $SQL_HOST -u $SQL_USER -p$SQL_PASSWORD -D $SQL_DATABASE -s -e"
#### Montamos la sentencia SQL y la lanzamos
mysql $SQL_ARGS "SELECT CURDATE();"
i=0
while IFS=, read -r col1 col2 col3 col4 col5
do
  
    D="$(cut -d'/' -f1 <<<"$col1")"
    len=${#D}
    if [ $len != "2" ]
    then 
        dia="0"$D
    else 
        dia=$D
    fi
    M="$(cut -d'/' -f2 <<<"$col1")"
    len=${#M}
    if [ $len != "2" ]
    then 
        mes="0"$M
    else
        mes=$M
    fi
    Y="$(cut -d'/' -f3 <<<"$col1")"
  
    date=$Y"-"$mes"-"$dia
    echo '{ "fecha": "'"$date"'", "peso": '$col2', "grasa": '$col3', "g_bisceral": '$col4', "musculo": '$col5' }'

    curl -X POST -H "Accept:application/json" -H "Content-Type:application/json" -H "auth: $key" -d \
    '{ "fecha": "'"$date"'", "peso": '$col2', "grasa": '$col3', "g_bisceral": '$col4', "musculo": '$col5' }'\
    http://localhost:3000/rp/

echo $?
echo $date
echo $i
let "i++"
   
   # mysql $SQL_ARGS "INSERT INTO registro_peso (fecha, userId, grasa, peso, g_bisceral, musculo) values ("$date",2,$col3, $col2, $col4, $col5)"

done < src/util/Peso.1.csv

