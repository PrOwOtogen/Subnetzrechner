var teset = 21;



var clicked = false;

function calc(){

    
    var ip = document.getElementById("ip").value;
    var subnetzanzahl = document.getElementById("subnetz").value;  
    var ip_array = ip.split(".");
    gen_subnetz(ip_array, subnetzanzahl);
    
}

function gen_subnetz(ip_array, subnetzanzahl){
    var netzanteil = ip_array[0] + "." + ip_array[1] + "." + ip_array[2] + ".";
    //get next square of two
    var next_sq = Math.pow(2, Math.ceil(Math.log(subnetzanzahl)/Math.log(2)));
    var anzahl_hosts = 256 / next_sq;
    console.log("anzahl_hosts: " + anzahl_hosts);
    console.log("next_sq: " + next_sq);
    var subnetzarray = [];
    var Hosts_min = [];
    var Hosts_max = [];
    var broadcast_array = [];
    //Subnetzgenerierung
    for (var i = 0; i < next_sq; i++) {
        if (i == 0){
            subnetzarray.push(netzanteil + "0");
            continue;
        }

        var n_netzanteil = netzanteil + (i * anzahl_hosts);
        
        subnetzarray.push(n_netzanteil);
    }
    //Hosts generierung
    for (var i = 0; i < next_sq; i++) {
        if (i == 0){
            Hosts_min.push(netzanteil + "1");
            Hosts_max.push(netzanteil + (anzahl_hosts -2));
            continue;
        }
        
        Hosts_min.push( netzanteil + (i * anzahl_hosts + 1));
        Hosts_max.push( netzanteil + (i * anzahl_hosts + anzahl_hosts - 2));
    }   
    //broadcastgenerierung
    for (var i = 0; i < next_sq+1; i++) {
        if (i == 0){
            broadcast_array.push(netzanteil + (anzahl_hosts - 1));
            continue;
        }
        
        broadcast_array.push( netzanteil + (i * anzahl_hosts + anzahl_hosts - 1));
    }   


    for (var i = 0; i < next_sq; i++) {
        console.log(subnetzarray[i] + "|" + Hosts_min[i] + " - " + Hosts_max[i] + "|" + broadcast_array[i]);
    }
    
    
    //output table
    var outputtable = document.getElementsByTagName("table")[0];
    outputtable.innerHTML = "<table><tr><th>Anzahl</th><th>Subnetz</th><th>Hostbereich</th><th>Broadcast</th></tr>";
    for (var i = 0; i < next_sq; i++) {
        var outputtable = document.getElementsByTagName("table")[0];
        var row = outputtable.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = "Subnetz " + (i+1);
        cell2.innerHTML = subnetzarray[i];
        cell3.innerHTML = Hosts_min[i] + " - " + Hosts_max[i];
        cell4.innerHTML = broadcast_array[i];
        clicked = true;
    }
    console.log(anzahl_hosts + " " + subnetzanzahl + " " +next_sq)
    set_txt(anzahl_hosts,subnetzanzahl,next_sq,ip_array);
}

function set_txt(a_h,s_a,n_s,ip_array){
    var anzahl_IP = document.getElementById("anzahlips")
    var anzahl_N_IP = document.getElementById("anzahlhosts")
    var not_w = document.getElementById("anzahlnotwant")
    var anzahl_sub = document.getElementById("anzahlsubs")
    var submask = document.getElementById("submask")
    anzahl_IP.innerHTML += " " + a_h;
    anzahl_N_IP.innerHTML += " " + a_h - 2;
    not_w.innerHTML += " " + n_s - s_a;
    anzahl_sub.innerHTML += " " + n_s;
    //split s_a
    submask.innerHTML += "255.255.255: " + (256-s_a) + "||" + ip_array[0] + "." + ip_array[1] + "." + ip_array[2] + "." + 0 + "/";
}

