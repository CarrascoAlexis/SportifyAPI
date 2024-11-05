const bcrypt = require('bcrypt');

// Fonction permetant la création automatique d'une Selection SQL 
exports.generateQuery = function(table, rows, filters, columns = "*") {
    // Recuperations des filtres depuis la requette ( a transmettre en argument via la variable filters)
    let query = `SELECT ${columns} FROM ${table} WHERE `
    if(filters === undefined || filters == null || filters == {})
    {
        // Si les filtres sont inexistants (non renseignés) ou vides (repuis la requette) on génère une query qui récupère tous les éléments
        query += "1"
    }else
    {
        // Sinon iterration sur chaque filtre indiqué
        rows.forEach((element, idx, array) => {
            // Vérification pour chaque colone de la table si celle-ci a un filtre à appliquer
            // Iterrer sur les filtres pourrait générer d'autres erreurs, si des filtres inutiles sont renseignés ceux-cis sont ignorés
            if(filters[element.COLUMN_NAME] != undefined && filters[element.COLUMN_NAME] != null)
            {
                // Ajoute d'un filtre a la query SQL en prennant bien note d'ajouter un espace au début et un "AND" a la fin pour de potentiels autres filtres
                query += ` ${element.COLUMN_NAME} = "${filters[element.COLUMN_NAME]}" AND`
            }
        })
        // Suppression du "AND" présent a la fin de la query (en trop)
        query = query.substring(0, query.lastIndexOf(" "))
    }
    return query
}

const isEmpty = function(object) {
    if(object == 0) return false;
    return Object.keys(object).length === 0
}

exports.emptyParam = function (params)
{
    if(!Array.isArray(params))
    {
        if(params == null || params == undefined || isEmpty(params) || params == "") return true;
        return false;
    }
    for(var i = 0; i < params.length; i++)
    {
        if(params[i] == null || params[i] == undefined || isEmpty(params[i]) || params[i] === "")
        {
            console.log(isEmpty(params[i]))
            return true;
        }
    }
    return false
}

exports.comparePassword = async function(password, hash, res) {
    await bcrypt.compare(password, hash, function(err, result) {
        if(err) return err;
        if (result) res.send(true)
        else res.send(false)
        return;
    });
};

exports.isEmpty = isEmpty