function FormCtrl($scope) {
    $scope.firstName = '';
    $scope.lastName = '';

    $scope.insertRecords = function() {
        $scope.shortName = 'MyDatabase';
        $scope.version = '1.0';
        $scope.displayName = 'My Test Database Example';
        $scope.maxSizeInBytes = 65536;
        $scope.db = openDatabase($scope.shortName, $scope.version, $scope.displayName, $scope.maxSizeInBytes);
        $scope.createTableIfNotExists();
        $scope.insertsql = 'INSERT INTO Contacts (firstName, lastName) VALUES (?, ?)';

        $scope.db.transaction(
            function (transaction) {
                transaction.executeSql($scope.insertsql, [$scope.firstName, $scope.lastName]);
            }
        );
    };

    $scope.createTableIfNotExists = function() {
        $scope.createsql = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT)";
        $scope.db.transaction(
            function (transaction) {
                transaction.executeSql($scope.createsql, []);
            }
        );
    };
}