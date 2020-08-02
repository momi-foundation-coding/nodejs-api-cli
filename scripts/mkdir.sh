# take first command passed and create such file
dir_name=$1

if [ -d "$dir_name" ]; then
    echo "Removing $dir_name"
    rm -r "$dir_name"
elif [ -f "$dir_name" ]; then
    echo "File with this name already exists, not a directory"
    exit
fi

if mkdir "$dir_name"; then 
    echo "Created directory $dir_name"
else 
    echo "Failed to created directory $dir_name"
fi