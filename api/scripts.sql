-- Resposta questao 2 

SELECT COUNT(*) as nr_vezes, rubrica 
FROM boletins 
WHERE mes BETWEEN 1 and 6 and ano = 2016
GROUP BY rubrica
ORDER BY nr_vezes DESC
LIMIT 10

-- Resposta questao 3

SELECT COUNT(*) as nr_vezes, d.nome_delegacia_circ
FROM boletins b
INNER JOIN delegacias d ON b.id_delegacia = d.id_delegacia
GROUP BY d.nome_delegacia_circ
ORDER BY nr_vezes DESC
LIMIT 1

-- Resposta questao 4

SELECT z.mes, MAX(z.nr_vezes) as nr_vezes, 
(
	SELECT conduta 
	FROM boletins 
	WHERE mes = z.mes 
	GROUP BY conduta 
	ORDER BY COUNT(*) DESC LIMIT 1
) AS conduta 
FROM (
		SELECT mes, conduta, count(conduta) as nr_vezes
		FROM boletins 
		WHERE conduta IS NOT NULL
		GROUP BY conduta, mes
		ORDER BY mes ASC, nr_vezes DESC
) z
GROUP BY z.mes
ORDER BY z.mes ASC, nr_vezes DESC


-- Bonus Point 1

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 1 
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) AS mes1

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 2
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes2

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 3
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes3

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 4
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes4

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 5
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes5

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 6
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes6

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 7
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes7

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 8
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes8

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 9
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes9

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 10
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes10

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 11
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes11

UNION ALL

SELECT * FROM (
SELECT mes, rubrica, count(rubrica) as nr_vezes
FROM boletins
WHERE mes = 12
GROUP BY rubrica, mes
ORDER BY mes ASC, nr_vezes DESC
LIMIT 3
) mes12


-- Bonus Point 2 
-- Select retornar o total de condutas não nulas que menos ocorreram por mes

SELECT z.mes, MIN(z.nr_vezes) as nr_vezes, 
(
	SELECT conduta FROM boletins
	WHERE conduta IS NOT NULL AND mes = z.mes
	GROUP BY conduta
	ORDER BY Count(conduta) ASC
	LIMIT 1
) as conduta 
FROM (
		SELECT mes, conduta, count(conduta) as nr_vezes
		FROM boletins 
		WHERE conduta IS NOT NULL
		GROUP BY conduta, mes
		ORDER BY mes ASC, nr_vezes DESC
) z
GROUP BY z.mes
ORDER BY z.mes ASC, nr_vezes DESC

