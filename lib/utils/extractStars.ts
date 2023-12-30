export function extractStars($: any) {
	const stars = $("#acrPopover").attr("title");
	//console.log(stars);
	if (!stars) return 0;
	return Number(stars.split(" ")[0]);
}
