const MW_aa = {
		A:32,
		R:102,
		N:136,
		D:58,
		C:225,
		Q:142,
		E:78,
		G:21,
		H:5125,
		I:45,
		L:45,
		K:41,
		M:980,
		F:5200,
		P:2675,
		S:34,
		T:41,
		W:29050,
		Y:5375,
		V:43};

function calculateMW (sequence) {
	let MW = 0;
	sequence = sequence.toUpperCase();
	for (var i = 0; i < sequence.length; i++) {
		aa = sequence.charAt(i);
		if (MW_aa[aa] != undefined) {
			MW += eAA[aa];
		}
	}
	return MW;
}



//Extinction coefficient of a peptide bond, M-1*cm-1
ePeptideBond = 923; 

//Extinction coefficients of individual amino acids, M-1*cm-1
const eAA = { 
		A:32,
		R:102,
		N:136,
		D:58,
		C:225,
		Q:142,
		E:78,
		G:21,
		H:5125,
		I:45,
		L:45,
		K:41,
		M:980,
		F:5200,
		P:2675,
		S:34,
		T:41,
		W:29050,
		Y:5375,
		V:43};

eeP_Nterm = 30;

function calculateEcoeff214nm (sequence) {
	E = 0;
	previousAA = false;
	sequence = sequence.toUpperCase();
	for (var i = 0; i < sequence.length; i++) {
		aa = sequence.charAt(i);
		if (eAA[aa] != undefined) {
			if (aa == 'P' & !previousAA) {
				E += eeP_Nterm;

			} else {
				E += eAA[aa];
			}
			if (previousAA) 
				{ E += ePeptideBond }
			previousAA = true;
		}
	}
	return E;
}

