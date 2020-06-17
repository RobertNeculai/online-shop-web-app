window.LogedInPage = {
    API_URL: "http://localhost:8082/user",


    getUserSession: function () {
        $.ajax({
            url: LogedInPage.API_URL + "/user",
            method: "GET",
        }).done(function (response) {
            LogedInPage.getUserById(response);

        })
    },

    getUserById: function (id) {
        $.ajax({
            url: LogedInPage.API_URL + id,
            method: "GET"
        }).done(function (user) {
             console.log(user);
            $(".user-menu").html(LogedInPage.displayUserName(user));

        });
    },

    displayUserName: function (user) {

        return `<li><a  class="fa fa-user" data-id=${user.id}>${user.username}</a></li>`
    }

};
LogedInPage.getUserSession();