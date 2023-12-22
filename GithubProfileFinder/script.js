function getProfile() {
    const username = $('#username').val();
    const profileContainer = $('#profile-container');

    // Fetch user profile
    $.ajax({
        url: `https://api.github.com/users/${username}`,
        method: 'GET',
        success: function (userData) {
            // Display user profile information
            profileContainer.html(`
                <div class="profile-card">
                    <h2>${userData.login}</h2>
                    <img src="${userData.avatar_url}" alt="Profile Image" style="width: 100px; height: 100px; border-radius: 50%;">
                    <p>Followers: ${userData.followers}</p>
                    <p>Following: ${userData.following}</p>
                    <p id="repo-count">Repositories: Loading...</p>
                </div>
            `);

            // Fetch user repositories
            $.ajax({
                url: `https://api.github.com/users/${username}/repos`,
                method: 'GET',
                success: function (repoData) {
                    // Display the count of repositories
                    const repoCount = repoData.length;
                    $('#repo-count').html(`Repositories: ${repoCount}`);

                    // Make the profile card clickable to navigate to the GitHub page
                    $('.profile-card').click(function () {
                        window.location.href = `https://github.com/${username}`;
                    });
                },
                error: function (repoError) {
                    console.error('Error fetching GitHub repositories:', repoError);
                    $('#repo-count').html('Error fetching repositories');
                }
            });
        },
        error: function (userError) {
            console.error('Error fetching GitHub profile:', userError);
            profileContainer.html('<p>Error fetching profile</p>');
        }
    });
}
