year=$1
day=$2

dayjs="${year}/${day}.js"
input="${year}/input/${day}"

if test -f "${dayjs}"; then
	echo "${dayjs} already exists"
else
	echo "creating ${dayjs}"
	cp template/template.js $dayjs
fi

if test -f "${input}.txt"; then
	echo "${input}.txt exists"
else
	echo "creating ${input}.txt"
	touch "${input}.txt"
fi

if test -f "${input}e.txt"; then
	echo "${input}e.txt exists"
else
	echo "creating ${input}e.txt"
	touch "${input}e.txt"
fi
