#!/bin/bash

# #!/bin/bash

# # Définir les variables
# SERVER_USER="serveurMaj"  # Remplacez par votre nom d'utilisateur sur le serveur
# SERVER_HOST="192.168.60.141" # Remplacez par l'adresse IP ou le nom d'hôte du serveur
# KEY_PATH="$HOME/.ssh/id_rsa"  # Chemin vers la clé privée SSH
# PUBLIC_KEY_PATH="$KEY_PATH.pub"
# echo"$HOME"
# # Étape 1: Générer une paire de clés SSH
# if [ ! -f "$KEY_PATH" ]; then
#     echo "Aucune clé SSH trouvée. Génération d'une nouvelle paire de clés..."
#     ssh-keygen -t rsa -b 4096 -C "votre-email@example.com" -f "$KEY_PATH" -N ""
# else
#     echo "Une clé SSH existe déjà à l'emplacement $KEY_PATH."
# fi

# # Étape 2: Copier la clé publique sur le serveur
# echo "Copie de la clé publique sur le serveur..."
# ssh-copy-id -i "$PUBLIC_KEY_PATH" "$SERVER_USER@$SERVER_HOST"

# # Vérifier si la clé publique a été copiée avec succès
# if [ $? -eq 0 ]; then
#     echo "Clé publique copiée avec succès sur le serveur."
# else
#     echo "Échec de la copie de la clé publique. Veuillez vérifier les erreurs."
#     exit 1
# fi

# # Étape 3: Tester la connexion SSH
# echo "Test de la connexion SSH au serveur..."
# ssh -i "$KEY_PATH" "$SERVER_USER@$SERVER_HOST" "echo 'Connexion réussie !'"

# # Vérifier si la connexion SSH a réussi
# if [ $? -eq 0 ]; then
#     echo "Connexion SSH réussie."
# else
#     echo "Échec de la connexion SSH. Veuillez vérifier les erreurs."
#     exit 1
# fi



# les path
cd "$(dirname "$0")"
# Print the current directory to be captured by Java 
 cd ..
# Change to the specific directory
  cd Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit/
#   cd Gestion_Angular_Front_end/src/app/modules/admin/components/side-bar
# cd Gestion_Angular_Front_end/src/app/modules/
# cd Gestion_Angular_Front_end/src/app/modules/comptable
# cd Gestion_Angular_Front_end/src/app/modules/personnel

# Assign the current directory to the variable 'path'
path=$(pwd)
# home=$($home)
# Variables
echo "Début du script mise_a_jour.sh\n"
 LOCAL_DIR=$path
# REMOTE_DIR="/z/logiciel_MAJ/"
 REMOTE_DIR="/home/versioning/depot_logiciel/gestion_Ressources_MAJ/Gestion_Angular_Front_end/src/app/modules/admin/interfaces/page-produit/list-produit"
# REMOTE_DIR="/home/serveurMaj/versioning/gestion_Ressources_MAJ/Gestion_Angular_Front_end/src/app/modules/"
# REMOTE_DIR="/home/versioning/depot_logiciel/gestion_Ressources_MAJ/Gestion_Angular_Front_end/src/app/modules/admin/components/side-bar"
USERNAME="serveurMaj"
SERVER="192.168.60.141"


# Print the variable 'path' to be captured by Java
echo "le path est : ================================path="
echo "path=$path"
# Fonction pour remplacer le fichier local par le fichier distant
replace_local_file() {
    local local_file=$1
    local temp_local_copy=$2
    echo "Remplacement du fichier local $local_file par le fichier distant..."
    mv $temp_local_copy $local_file
}

# Fonction pour comparer et remplacer les fichiers
compare_and_replace() {
    local local_file=$1
    local remote_file=$2
    local temp_local_copy=$3

    echo "Tentative de téléchargement du fichier distant $remote_file..."
    scp $USERNAME@$SERVER:$remote_file $temp_local_copy
    local scp_exit_code=$?
    echo "Code de sortie de SCP: $scp_exit_code"

    # Vérification et comparaison des fichiers
    if [ -f $temp_local_copy ]; then
        if diff $local_file $temp_local_copy > /dev/null; then
            echo "Les fichiers sont identiques."
        else
            echo "Les fichiers sont différents. Remplacement en cours..."
            replace_local_file $local_file $temp_local_copy
        fi
        # Suppression de la copie temporaire
        rm $temp_local_copy
    else
        echo "Échec du téléchargement du fichier distant."
        exit 1
    fi
}

# Fonction pour parcourir les répertoires et comparer les fichiers
process_directory() {
    local local_dir=$1
    local remote_dir=$2

    echo "Traitement du répertoire local: $local_dir"
    echo "Traitement du répertoire distant: $remote_dir"

    for local_file in $(find $local_dir -type f); do
        echo "Traitement du fichier local: $local_file"
        relative_path=${local_file#$local_dir/}
        remote_file="$remote_dir/$relative_path"
        temp_local_copy="/tmp/$(basename $local_file)"

        echo "Comparaison avec le fichier distant: $remote_file"
        compare_and_replace $local_file $remote_file $temp_local_copy
    done
}

# Exécution du traitement
 process_directory $LOCAL_DIR $REMOTE_DIR

echo "fin du script mise_a_jour.sh OK "

cd "$(dirname "$0")"

cd ..

# Print the variable 'path' to be captured by Java
echo "le path est : ================================path="
echo "path=$path"
