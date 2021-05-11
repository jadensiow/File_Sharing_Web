# 1. Set-up backend

# From Scratch
# Set-up New EC2 instance - Console > EC2 > Instances > Launch Instance >> Ubuntu 18 > Security groups (allow ssh and TCP (8000) access to your IP address)
# SSH into EC2 instance - ssh -i <path-to-key> ubuntu@<ip-address> - Download https://www.putty.org/
# Install docker - https://docs.docker.com/engine/install/ubuntu/
sudo systemctl start docker
sudo systemctl enable docker
sudo chmod 666 /var/run/docker.sock
# Clone Github Repository

# Updating EC2 instance
# Update local github repository
ssh -i <path-to-key> ubuntu@<ip-address>
cd File_Sharing_Web
git pull

# Stop Docker container
docker ps # COPY Container ID
docker stop <container-id>

# Push settings.py
# Export environment variables from .env file

# Build Docker image
docker build -t file-sharing-backend ./backend
docker run -d -p 8000:8000 file-sharing-backend


# 2. Start RDS database if not running
# Configure backend/youtubedjango/settings.py database credentials accordingly

# Configure RDS's Security group to allow access to EC2's security group on port 5432


# 3. Set-up Frontend
# https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html